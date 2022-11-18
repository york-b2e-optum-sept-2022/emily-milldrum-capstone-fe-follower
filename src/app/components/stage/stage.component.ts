import {Component, Input, OnInit} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../_interfaces/IProcess";
import {IStage} from "../../_interfaces/IStage";

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

  constructor(private processService: ProcessService) {
    this.processService = processService

    this.processService.$selectedProcess.pipe(takeUntil(this.onDestroy)).subscribe(
      selectedProcess => {
        this.selectedProcess = selectedProcess;
      }
    )
    console.log(this.stage)
    console.log(this.selectedProcess?.stage)
    // if (this.selectedProcess !== null){
    //   this.stage = this.selectedProcess.stage)
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
}
