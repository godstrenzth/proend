// To parse this data:
//
//   import { Convert } from "./file";
//
//   const applyuser = Convert.toApplyuser(json);

export interface Applyuser {
  aid:         number;
  tid:         number;
  user_id:     number;
  type_user:   number;
  score:       null;
  email:       string;
  password:    string;
  fullName:    string;
  gender:      string;
  brithday:    string;
  phoneNumber: string;
  id_card:     string;
  typeID:      number;
  cid:         number;
  model:       string;
  amount:      number;
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
