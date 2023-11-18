// To parse this data:
//
//   import { Convert } from "./file";
//
//   const shop = Convert.toShop(json);

export interface Shop {
  ioid:    number;
  cid:     number;
  name:    number | string;
  phone:   number | string;
  address: number | string;
  status:  string;
  payment: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toShop(json: string): Shop[] {
      return JSON.parse(json);
  }

  public static shopToJson(value: Shop[]): string {
      return JSON.stringify(value);
  }
}
