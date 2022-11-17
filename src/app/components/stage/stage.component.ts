import { Component, OnInit } from '@angular/core';
import * as Process from "process";
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../_interfaces/IProcess";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  selectedProcess: IProcess | null = null;
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService = processService

    this.processService.$selectedProcess.pipe(takeUntil(this.onDestroy)).subscribe(
      selectedProcess => {
        this.selectedProcess = selectedProcess;
      }
    )
  }

  ngOnInit(): void {
  }

}
