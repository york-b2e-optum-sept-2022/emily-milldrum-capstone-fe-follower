import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../_interfaces/IProcess";
import {IStage, IStageOptions} from "../../_interfaces/IStage";
import {IResponse} from "../../_interfaces/IResponse";
import {IAnswer} from "../../_interfaces/IAnswer";
import {ERRORS} from "../../_enums/ERRORS";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() stage: IStage | null = null;
  selectedProcess: IProcess | null = null;
  onDestroy = new Subject();


  errorMessage: string | null = null;

  cur: number = 0;
  response: IResponse | null = null;
  answer: IAnswer = {
    stage:
      {
        id: 0,
        question: "",
        stageOrder: 0,
        type: "",
        stageOptions: []
      },
    answer: ""
  }

  option: string = "";

  //html fields
  notLast: boolean = true;
  curType: string = "Textbox";
  curStageOptions: IStageOptions[] = [];
  curQuestion: string =  "";
  curStageOrder: number = 0;
  percentDone: number = 0;
  curStageNum: number = 0;
  totalStageNum: number = 0;
  responseComplete: boolean = false;

  constructor(private processService: ProcessService) {
    this.processService = processService

    this.processService.$errorMessage.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message)

    this.processService.$selectedProcess.pipe(takeUntil(this.onDestroy)).subscribe(
      selectedProcess => {
        this.selectedProcess = selectedProcess;
      }
    )
    //set first values

  }

  ngOnInit(): void {
    //if there is a process selected set total stage num, create response
    if (this.selectedProcess) {
      this.totalStageNum = this.selectedProcess.stage.length;
      if (this.cur == (this.selectedProcess.stage.length - 1)) {
        this.notLast = false;
      }

      this.setNext();

      this.response = {
        processes: this.selectedProcess,
        answer: []
      };
    }
    this.processService.$errorMessage.next(null)


  }


  next() {
    //validation
    if (this.selectedProcess == null) {
      this.processService.$errorMessage.next(ERRORS.PROCESS_NULL)
    } else if (this.option == "" || this.option == null){
      this.processService.$errorMessage.next(ERRORS.ANSWER_BLANK)
    } else {
      //if this is the last prompt change button
      if (this.cur == (this.selectedProcess.stage.length - 2)) {
        this.notLast = false;
      }
      this.setAnswer()
      //set next prompt
      this.curStageNum += 1;
      this.cur = this.cur + 1;
      this.setNext();
      this.percentDone = (this.cur / this.selectedProcess.stage.length) * 100;
      this.option = "";
    }
  }

  setAnswer() {
    //validation
    if (this.selectedProcess == null) {
      this.processService.$errorMessage.next(ERRORS.PROCESS_NULL)
    } else {
      if (this.response) {
        if (this.answer) {
          this.answer.stage = {...this.selectedProcess.stage[this.cur]};
          this.answer.answer = this.option
          this.processService.addAnswer(this.selectedProcess,this.answer)
          this.processService.$errorMessage.next(null)
        }
      }
    }
  }

  submit() {
    this.setAnswer()
    if(this.selectedProcess && this.response){
    }
    if (this.response){
      this.processService.submitResponse(this.response)
      this.processService.$errorMessage.next(null)
      this.responseComplete = true;
    } else {
      this.processService.$errorMessage.next(ERRORS.SUBMIT_ERROR)
    }
  }

  closeThis() {
    this.processService.$selectedProcess.next(null);
  }

  multiClick() {
    console.log('multi clicked')
    console.log(this.option)
  }

  private setNext() {
    if(this.selectedProcess) {
      this.curType = this.selectedProcess.stage[this.cur].type;
      this.curQuestion = this.selectedProcess.stage[this.cur].question;
      this.curStageOptions = this.selectedProcess.stage[this.cur].stageOptions;
      this.curStageOrder = this.selectedProcess.stage[this.cur].stageOrder;
    }
  }
}
