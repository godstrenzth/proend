// To parse this data:
//
//   import { Convert } from "./file";
//
//   const product = Convert.toProduct(json);

export interface Product {
  pid:   number;
  pname: string;
  price: number;
  tid:   number;
  img:   string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toProduct(json: string): Product[] {
      return JSON.parse(json);
  }

  public static productToJson(value: Product[]): string {
      return JSON.stringify(value);
  }
}
