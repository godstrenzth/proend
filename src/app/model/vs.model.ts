// To parse this data:
//
//   import { Convert } from "./file";
//
//   const vs = Convert.toVs(json);

export interface Vs {
  User_1_Name: string;
  score_u1:    number;
  User_2_Name: string;
  score_u2:    number;
  round:       number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toVs(json: string): Vs[] {
      return JSON.parse(json);
  }

  public static vsToJson(value: Vs[]): string {
      return JSON.stringify(value);
  }
}
