import {STAGETYPE} from "../_enums/STAGETYPE";

export interface IStage {
  id: number;
  question: string;
  order: number;
  type: STAGETYPE;
}
