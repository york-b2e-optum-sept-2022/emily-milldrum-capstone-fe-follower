import {IStage} from "./IStage";

export interface IProcess {
  id: number;
  title: string;
  discontinued: boolean;
  stages: IStage[];
}
