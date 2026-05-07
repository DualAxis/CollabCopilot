import type { AssessmentState } from "./assessment";
import type { AssessmentResults } from "./results";
import { getServiceRoleClient } from "./supabase-server";

export async function saveAssessment(
  state: AssessmentState,
  results: AssessmentResults
): Promise<string> {
  const supabase = getServiceRoleClient();

  const { data, error } = await supabase
    .from("assessments")
    .insert({
      assessment_state: state,
      results,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`assessments insert failed: ${error.message}`);
  }
  if (!data) {
    throw new Error("assessments insert returned no row");
  }

  return data.id;
}
