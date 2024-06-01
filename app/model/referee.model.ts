// To parse this data:
//
//   import { Convert } from "./file";
//
//   const referee = Convert.toReferee(json);

export interface Referee {
  rid:         string;
  cid:         string;
  user_id:     string;
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
  public static toReferee(json: string): Referee[] {
      return JSON.parse(json);
  }

  public static refereeToJson(value: Referee[]): string {
      return JSON.stringify(value);
  }
}
