// To parse this data:
//
//   import { Convert } from "./file";
//
//   const apply = Convert.toApply(json);

export interface Apply {
  aid:     number;
  cid:     number;
  user_id: number;
  tid:     number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toApply(json: string): Apply[] {
      return JSON.parse(json);
  }

  public static applyToJson(value: Apply[]): string {
      return JSON.stringify(value);
  }
}
