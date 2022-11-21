import {Component, Input, OnInit} from '@angular/core';
import {IProcess} from "../../_interfaces/IProcess";
import {ProcessService} from "../../services/process.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  @Input() process: IProcess = {
    id: 0,
    title: "",
    discontinued: false,
    stage: [],
  };

  errorMessage: string | null = null;
  onDestroy = new Subject();
  constructor(private processService: ProcessService, private modalService: NgbModal) {

    this.processService.$errorMessage.pipe(takeUntil(this.onDestroy)).subscribe(message => this.errorMessage = message)

  }

  ngOnInit(): void {
    this.numStages = this.process.stage.length + 1;
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

  //open stage input in modal
  numStages: number = 0;
  openThis() {
    // this.processService.$processToUpdate.next(this.process)
    // this.modalService.open(StageInputComponent);
  }

  onRespond() {
    this.processService.$selectedProcess.next(this.process)
  }
}
