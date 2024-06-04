// To parse this data:
//
//   import { Convert } from "./file";
//
//   const compets = Convert.toCompets(json);

export interface Compets {
  cid:         number;
  hostID:      number;
  competName:  string;
  regis_end:   string;
  compet_date: string;
  detail:      string;
  contact:     string;
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
