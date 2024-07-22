// To parse this data:
//
//   import { Convert } from "./file";
//
//   const referee = Convert.toReferee(json);

export interface Referee {
  user_id:     number;
  email:       string;
  password:    string;
  fullName:    string;
  gender:      string;
  brithday:    string;
  phoneNumber: string;
  id_card:     null;
  aid:         number;
  tid:         number;
  type_user:   number;
  typeID:      number;
  cid:         number;
  model:       string;
  amount:      number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toReferee(json: string): Referee[] {
      return JSON.parse(json);
  }

  public static refereeToJson(value: Referee[]): string {
      return JSON.stringify(value);
  }
}
