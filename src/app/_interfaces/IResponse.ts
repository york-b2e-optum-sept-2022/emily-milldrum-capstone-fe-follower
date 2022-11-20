import {IProcess} from "./IProcess";
import {IAnswer} from "./IAnswer";

export interface IResponse {
  processes: IProcess;
  answer: IAnswer[];
}
