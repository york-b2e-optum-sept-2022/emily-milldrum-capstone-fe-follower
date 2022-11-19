import {IProcess} from "./IProcess";
import {IStage} from "./IStage";

export interface IResponse {
  process: IProcess;
  answer: IAnswer[];
}

export interface IAnswer {
  stage: IStage;
  answer: string;
}
