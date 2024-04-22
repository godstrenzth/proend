// To parse this data:
//
//   import { Convert } from "./file";
//
//   const compets = Convert.toCompets(json);

export interface Compets {
  cid:         string;
  hostID:      string;
  competName:  string;
  regis_start: string;
  regis_end:   string;
  amount:      string;
  compet_date: string;
  email:       string;
  phone:       string;
  place:       string;
  poster:      string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCompets(json: string): Compets[] {
      return JSON.parse(json);
  }

  public static competsToJson(value: Compets[]): string {
      return JSON.stringify(value);
  }
}
