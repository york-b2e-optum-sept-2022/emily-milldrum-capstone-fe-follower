import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "../_interfaces/IProcess";
import {ERRORS} from "../_enums/ERRORS";
import {IStage} from "../_interfaces/IStage";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  processList: IProcess[] = [];
  $selectedProcess = new BehaviorSubject<IProcess | null>(null)
  $processList = new BehaviorSubject<IProcess[]>([])
  $processError = new BehaviorSubject<string | null>(null)

  $stageList = new BehaviorSubject<IStage[]>([])

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
        this.$processError.next(ERRORS.PROCESSES_HTTP_ERROR);
      }
    });
  }

  getStageById(id: number) {

  }
}
