import {Component, Input, OnInit} from '@angular/core';
import {IStageOptions} from "../../_interfaces/IStage";
import {ProcessService} from "../../services/process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-stage-options',
  templateUrl: './stage-options.component.html',
  styleUrls: ['./stage-options.component.css']
})
export class StageOptionsComponent implements OnInit {

  @Input() option!: IStageOptions;
  checked: boolean = false;
  selectedOptions: string = '';
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService.$selectedOptions.pipe(takeUntil(this.onDestroy)).subscribe(
      opts => this.selectedOptions = opts
    );

  }

  ngOnInit(): void {
    console.log(this.option)
  }


  multiClickAdd() {
    console.log('add')
    this.checked = true;
    console.log(this.option.option)

    this.selectedOptions = this.selectedOptions + this.option.option + ","
    this.processService.$selectedOptions.next(this.selectedOptions)
    console.log(this.selectedOptions)
  }

  multiClickRemove() {
    console.log('remove')
    this.selectedOptions.replace(this.option.option, '')
    console.log(this.selectedOptions)
    this.checked = false;
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();

  }
}
