export interface IStage {
  id: number;
  question: string;
  stageOrder: number;
  type: string;
  stageOptions: IStageOptions[];
}

export interface IStageOptions {
  id: number,
  option: string
}

export interface IStageOptionsNew {
  option: string
}
