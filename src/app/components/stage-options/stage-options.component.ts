import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stage-options',
  templateUrl: './stage-options.component.html',
  styleUrls: ['./stage-options.component.css']
})
export class StageOptionsComponent implements OnInit {

  @Input() choice!: any;
  option: any;
  constructor() { }

  ngOnInit(): void {
    }

    onClick(){
    console.log(this.choice)
    }
}
