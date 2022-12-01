import { Component, OnInit } from '@angular/core';
import {ProcessService} from "../../services/process.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }

  home() {
    this.processService.$selectedProcess.next(null);
    this.processService.resetErrors();
  }
}
