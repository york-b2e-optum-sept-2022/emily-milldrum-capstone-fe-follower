import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "../_interfaces/IProcess";
import {ERRORS} from "../_enums/ERRORS";
import {IStage} from "../_interfaces/IStage";
import {IResponse} from "../_interfaces/IResponse";
import {IAnswer} from "../_interfaces/IAnswer";
//em final
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  processList: IProcess[] = [];
  $selectedProcess = new BehaviorSubject<IProcess | null>(null)
  $processList = new BehaviorSubject<IProcess[]>([])
  $errorMessage = new BehaviorSubject<string | null>(null)
  $selectedOptions = new BehaviorSubject<string>('')
  $stageList = new BehaviorSubject<IStage[]>([])


  response: IResponse = {
    processes: {
      id: 0,
      title: "",
      discontinued: false,
      stage: []
    },
    answer: []
  }


  constructor( private httpService: HttpService) {
    this.getAllProcess();
   // this.getAllStages();
  }

  getAllProcess(){
    this.httpService.getProcessList().pipe(first()).subscribe({
      next: (processList) => {this.processList = processList;
        this.$processList.next(processList)
        console.log(this.processList)
      },
      error: (err) => {
        console.error(err);
        this.$errorMessage.next(ERRORS.PROCESSES_HTTP_ERROR);
      }
    });
  }

  getStageById(id: number) {

  }

  submitResponse(response: IResponse) {
    console.log('ps submit to http')
    console.log(response.processes)
    console.log(response)
    console.log(this.response)
    this.httpService.createResponse(this.response).pipe(first()).subscribe({
      next: (response) =>{
        this.$errorMessage.next(null)
        this.$selectedOptions.next('')
      },
      error: (err) => {
        console.log(err)
        this.$errorMessage.next(ERRORS.SUBMIT_ERROR)
      }
    })

    //reset response for next survey
    this.response = {
      processes: {
        id: 0,
        title: "",
        discontinued: false,
        stage: []
      },
      answer: []
    }
  }

  addAnswer(process: IProcess, answer: IAnswer) {
    console.log('ps answer')
    console.log(answer)
    this.response.processes = process;

    let answerCopy = JSON.parse(JSON.stringify(answer));
    console.log(answerCopy)
    this.response.answer.push(answerCopy)
    console.log(this.response)

  }

  resetErrors(){
    this.$errorMessage.next(null)
  }
}
