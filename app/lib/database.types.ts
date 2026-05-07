import type { AssessmentState } from "./assessment";
import type { AssessmentResults } from "./results";

export type AssessmentRow = {
  id: string;
  created_at: string;
  user_id: string | null;
  assessment_state: AssessmentState;
  results: AssessmentResults;
};

export type AssessmentInsert = {
  id?: string;
  created_at?: string;
  user_id?: string | null;
  assessment_state: AssessmentState;
  results: AssessmentResults;
};

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: AssessmentRow;
        Insert: AssessmentInsert;
        Update: Partial<AssessmentInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
