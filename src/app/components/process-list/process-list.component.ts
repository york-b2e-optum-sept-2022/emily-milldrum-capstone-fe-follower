import { Component, OnInit } from '@angular/core';
import {IProcess} from "../../_interfaces/IProcess";
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../../services/process.service";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {
  processList: IProcess[] = [];
  errorMessage: string | null = null;
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe(
      processList => {this.processList = processList
      }
    )

    this.processService.$errorMessage.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
