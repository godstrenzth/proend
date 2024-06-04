// To parse this data:
//
//   import { Convert } from "./file";
//
//   const applyuser = Convert.toApplyuser(json);

export interface Applyuser {
  aid:         number;
  cid:         number;
  user_id:     number;
  tid:         number;
  email:       string;
  password:    string;
  fullName:    string;
  gender:      string;
  brithday:    string;
  phoneNumber: string;
  id_card:     null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toApplyuser(json: string): Applyuser[] {
      return JSON.parse(json);
  }

  public static applyuserToJson(value: Applyuser[]): string {
      return JSON.stringify(value);
  }
}
