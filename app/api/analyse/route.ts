import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { AssessmentResultsSchema } from "../../lib/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "../../lib/prompts";
import type { AssessmentState } from "../../lib/assessment";
import { saveAssessment } from "../../lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

type RequestBody = {
  state: AssessmentState;
};

export async function POST(req: Request) {
  const startedAt = Date.now();
  let body: RequestBody;

  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.state) {
    return NextResponse.json(
      { error: "Missing 'state' in request body" },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[/api/analyse] ANTHROPIC_API_KEY is not set");
    return NextResponse.json(
      { error: "Server is not configured for AI analysis" },
      { status: 500 }
    );
  }

  try {
    const { object } = await generateObject({
      model: anthropic("claude-sonnet-4-5"),
      schema: AssessmentResultsSchema,
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(body.state),
      temperature: 0.4,
      maxRetries: 1,
    });

    const elapsedMs = Date.now() - startedAt;
    console.log(
      `[/api/analyse] ok in ${elapsedMs}ms · area=${body.state.profile.area.join("|")} · stage=${body.state.q0}`
    );

    let assessmentId: string | null = null;
    try {
      assessmentId = await saveAssessment(body.state, object);
      console.log(`[/api/analyse] saved id=${assessmentId}`);
    } catch (dbErr) {
      const dbMsg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.error(`[/api/analyse] save failed (continuing): ${dbMsg}`);
    }

    return NextResponse.json({ results: object, assessmentId });
  } catch (err) {
    const elapsedMs = Date.now() - startedAt;
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[/api/analyse] failed in ${elapsedMs}ms: ${message}`);

    const isRateLimit = /rate.?limit|429|exceed.*tokens.*per minute/i.test(
      message
    );
    if (isRateLimit) {
      return NextResponse.json(
        {
          error:
            "Anthropic rate limit reached. Please wait ~60 seconds and try again.",
          code: "rate_limit",
        },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "AI analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
