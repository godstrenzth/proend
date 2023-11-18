// To parse this data:
//
//   import { Convert } from "./file";
//
//   const ordercus = Convert.toOrdercus(json);

export interface Ordercus {
  pname?: string;
  pid?:   number;
  count?: number;
  Price?: number;
  Total?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrdercus(json: string): Ordercus[] {
      return JSON.parse(json);
  }

  public static ordercusToJson(value: Ordercus[]): string {
      return JSON.stringify(value);
  }
}
