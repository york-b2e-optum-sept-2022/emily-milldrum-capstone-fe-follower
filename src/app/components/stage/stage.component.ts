import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../_interfaces/IProcess";
import {IStage, IStageOptions} from "../../_interfaces/IStage";
import {IResponse} from "../../_interfaces/IResponse";
import {IAnswer} from "../../_interfaces/IAnswer";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() stage: IStage | null = null;
  selectedProcess: IProcess | null = null;
  onDestroy = new Subject();

  type: string = "";
  stageOptions: string[] = [];
  errorMessage: string | null = null;


  cur: number = -1;
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

    this.processService.$selectedProcess.pipe(takeUntil(this.onDestroy)).subscribe(
      selectedProcess => {
        this.selectedProcess = selectedProcess;
      }
    )

    console.log('stage const')
    console.log(this.selectedProcess?.stage)
    console.log(this.stageOptions)
    // if (this.selectedProcess !== null){
    //   this.stage = this.selectedProcess.stage)
    // }

    this.next()
    // if(this.selectedProcess !== null){
    //   this.curType = this.selectedProcess.stage[this.cur].type;
    //   this.curQuestion = this.selectedProcess.stage[this.cur].question;
    //   this.curStageOption = this.selectedProcess.stage[this.cur].stageOptions;
    //   this.curStageOrder = this.selectedProcess.stage[this.cur].stageOrder;
    // }

  }

  ngOnInit(): void {
    //if there is a process selected set total stage num, create response
    if (this.selectedProcess) {
      this.totalStageNum = this.selectedProcess.stage.length;

      this.response = {
        process: this.selectedProcess,
        answer: []
      };
    }
    console.log(this.curStageOptions)
  }


  next() {
    //validation
    if (this.selectedProcess == null) {
      console.log('process test is null')

      //TODO MORE ERROR HANDLING

      // } else if (this.response == null || this.answer == null) {
      //     //throw error
      //     console.log('response/answer is null')
    } else {
      //if this is the last prompt change button
      if (this.cur == (this.selectedProcess.stage.length - 2)) {
        console.log('changeButton')
        this.notLast = false;
      }
      console.log(this.option);
      this.setAnswer()
      //set next prompt
      this.curStageNum += 1;
      this.cur = this.cur + 1;
      this.curType = this.selectedProcess.stage[this.cur].type;
      this.curQuestion = this.selectedProcess.stage[this.cur].question;
      this.curStageOptions = this.selectedProcess.stage[this.cur].stageOptions;
      this.curStageOrder = this.selectedProcess.stage[this.cur].stageOrder;
      this.percentDone = (this.cur / this.selectedProcess.stage.length) * 100;
      this.option = "";
    }
  }

  setAnswer() {
    //validation
    if (this.selectedProcess == null) {
      console.log('process test is null')

      //TODO MORE ERROR HANDLING

      // } else if (this.response == null || this.answer == null) {
      //     //throw error
      //     console.log('response/answer is null')
    } else {
      if (this.response) {
        if (this.answer) {
          this.answer.stage = this.selectedProcess.stage[this.cur];

          //TODO NEED way to pull answer from each type
          switch (this.selectedProcess.stage[this.cur].type) {
            case 'Boolean':
              console.log('stage is  boolean do this')
              break;
            case 'Multiple Choice: Single':
              console.log('stage is multi single do this')
              break;
            case 'Multiple Choice: Multiple':
              console.log('stage is multi multiple do this')
              break;
            default:
              console.log('stage is textbox do this')
              break;
          }

          this.answer.answer = this.option
          //deep copy to not have same answer for all
          let answerCopy = JSON.parse(JSON.stringify(this.answer));
          this.response.answer.push(answerCopy)
          console.log(this.response)
        }
      }
    }
  }

  submit() {
    this.setAnswer()
    if(this.selectedProcess && this.response){
    this.response.process =this.selectedProcess;
    }
    if (this.response){
      this.processService.submitResponse(this.response)
      this.responseComplete = true;
    } else {
      //TODO ERROR MESSAGE
    }
  }

  closeThis() {
    this.processService.$selectedProcess.next(null);
  }
}
