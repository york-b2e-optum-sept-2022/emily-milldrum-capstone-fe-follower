import {IProcess} from "./IProcess";
import {IAnswer} from "./IAnswer";

export interface IResponse {
  process: IProcess;
  answer: IAnswer[];
}
