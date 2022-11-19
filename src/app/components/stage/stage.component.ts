import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../_interfaces/IProcess";
import {IStage} from "../../_interfaces/IStage";
import {IAnswer, IResponse} from "../../_interfaces/IResponse";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  selectedProcess: IProcess | null = null;
  onDestroy = new Subject();
  @Input() stage: IStage | null = null;
  type: string = "";
  stageOptions: string[] = [];
  errorMessage: string | null = null;
  private output: any;


  cur: number = 0;
  response: IResponse | null = null;
  answer: IAnswer | null = null;
  notLast: boolean = true;
  curType: any;
  curStageOption: any;
  curQuestion: any;
  curStageOrder: any;
  percentDone: number = 0;




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

    const headerArr = {keys: Object.keys(this.stageOptions), values: Object.values(this.stageOptions)};

    //loop to display retrieved header keys and values
    for (let i = 0; i < headerArr.keys.length; i++){
      this.output.innerHTML += `<b>${headerArr.keys[i]}</b> <i>>>></i> ${headerArr.values[i]}<br>`
    }
  }

  onSubmit() {
    console.log('submit')
    console.log(this.output)
  }

  onNext() {

  }


  next() {
    console.log(this.cur)

    if (this.selectedProcess == null) {
      console.log('process test is null')
    } else if (this.cur == (this.selectedProcess.stage.length - 1)) {
      console.log('changeButton')
      this.notLast = false;
      // } else if (this.response == null || this.answer == null) {
      //     //throw error
      //     console.log('response/answer is null')
    } else {
      // this.response.answer.push(this.answer)
      console.log(this.selectedProcess.stage.length)
      this.cur = this.cur + 1;
      this.curType = this.selectedProcess.stage[this.cur].type;
      this.curQuestion = this.selectedProcess.stage[this.cur].question;
      this.curStageOption = this.selectedProcess.stage[this.cur].stageOptions;
      this.curStageOrder = this.selectedProcess.stage[this.cur].stageOrder;
      this.percentDone = (this.cur / this.selectedProcess.stage.length) * 100
    }
  }

  submit(){
    console.log('submit results')
    console.log(this.response?.answer)
  }

}
