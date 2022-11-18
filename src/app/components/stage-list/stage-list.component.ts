import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {IProcess} from "../../_interfaces/IProcess";
import {Subject, takeUntil} from "rxjs";
import {IStage} from "../../_interfaces/IStage";

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


}
