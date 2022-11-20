import { Component } from '@angular/core';
import {IProcess} from "./_interfaces/IProcess";
import {ProcessService} from "./services/process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emily-milldrum-capstone-fe-follower';
  selectedProcess: IProcess | null = null;
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService.$selectedProcess.pipe(takeUntil(this.onDestroy)).subscribe(
      selectedProcess => {
        this.selectedProcess = selectedProcess;
      }
    )
  }


  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
