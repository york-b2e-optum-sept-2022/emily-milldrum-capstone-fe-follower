import { Component, OnInit } from '@angular/core';
import {IProcess} from "../../_interfaces/IProcess";
import {IAnswer, IResponse} from "../../_interfaces/IResponse";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  processtest: IProcess | null =
    {
      id: 1,
      title: "TEST",
      discontinued: false,
      stage: [
        {
          id: 1,
          question: "why",
          stageOrder: 1,
          type: "Boolean",
          stageOptions: []
        },
        {
          id: 2,
          question: "how",
          stageOrder: 3,
          type: "Textbox",
          stageOptions: []
        },
        {
          id: 3,
          question: "where",
          stageOrder: 2,
          type: "Multiple Choice: Single",
          stageOptions: [
            {
              id: 1,
              option: "maybe"
            },
            {
              id: 2,
              option: "i guess"
            },
            {
              id: 3,
              option: "ok"
            },

          ]
        },
      ]
    };

  cur: number = 0;
  response: IResponse | null = null;
  answer: IAnswer | null = null;
  notLast: boolean = true;
  curType: any;
  curStageOption: any;
  curQuestion: any;
  curStageOrder: any;


  constructor() {
  }

  ngOnInit(): void {
    if(this.processtest !== null){
      this.curType = this.processtest.stage[this.cur].type;
      this.curQuestion = this.processtest.stage[this.cur].question;
      this.curStageOption = this.processtest.stage[this.cur].stageOptions;
      this.curStageOrder = this.processtest.stage[this.cur].stageOrder;
    }



  }

  next() {
    console.log(this.cur)
    console.log(this.processtest?.stage.length)
    if (this.processtest == null) {
      console.log('process test is null')
    } else if (this.cur == (this.processtest.stage.length - 1)) {
      console.log('changeButton')
      this.notLast = false;
    // } else if (this.response == null || this.answer == null) {
    //     //throw error
    //     console.log('response/answer is null')
      } else {
       // this.response.answer.push(this.answer)
        this.cur = this.cur + 1;
        this.curType = this.processtest.stage[this.cur].type;
        this.curQuestion = this.processtest.stage[this.cur].question;
        this.curStageOption = this.processtest.stage[this.cur].stageOptions;
        this.curStageOrder = this.processtest.stage[this.cur].stageOrder;

    }
  }

  submit(){
    console.log('submit results')
    console.log(this.response?.answer)
  }
}
