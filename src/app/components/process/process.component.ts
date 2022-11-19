import {Component, Input, OnInit} from '@angular/core';
import {IProcess} from "../../_interfaces/IProcess";
import {ProcessService} from "../../services/process.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  deleteAlert: string | null = null;
  constructor(private processService: ProcessService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.numStages = this.process.stage.length
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
    console.log('click')
    console.log(this.process)
    this.processService.$selectedProcess.next(this.process)
  }
}
