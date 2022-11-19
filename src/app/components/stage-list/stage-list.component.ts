import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {IProcess} from "../../_interfaces/IProcess";
import {Subject, takeUntil} from "rxjs";
import {IStage} from "../../_interfaces/IStage";
import {IAnswer, IResponse} from "../../_interfaces/IResponse";

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {


  @Input() process: IProcess = {
    id: 0,
    title: "",
    discontinued: false,
    stage: [],
  };
  stageList: IStage[] =[];

  onDestroy = new Subject();

  cur: number = 0;
  response: IResponse | null = null;
  answer: IAnswer | null = null;
  notLast: boolean = true;
  curType: any;
  curStageOption: any;
  curQuestion: any;
  curStageOrder: any;



  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    this.processService.$stageList.pipe(takeUntil(this.onDestroy)).subscribe(
      stageList => this.stageList = stageList
    );
    this.processService.getStageById(this.process.id)
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();

  }

  next() {
    console.log(this.cur)
    console.log(this.stageList.length)
    if (this.stageList == null) {
      console.log('process test is null')
    } else if (this.cur == (this.stageList.length - 1)) {
      console.log('changeButton')
      this.notLast = false;
      // } else if (this.response == null || this.answer == null) {
      //     //throw error
      //     console.log('response/answer is null')
    } else {
      // this.response.answer.push(this.answer)
      this.cur = this.cur + 1;
      this.curType = this.stageList[this.cur].type;
      this.curQuestion = this.stageList[this.cur].question;
      this.curStageOption = this.stageList[this.cur].stageOptions;
      this.curStageOrder = this.stageList[this.cur].stageOrder;

    }
  }

  submit(){
    console.log('submit results')
    console.log(this.response?.answer)
  }

}
