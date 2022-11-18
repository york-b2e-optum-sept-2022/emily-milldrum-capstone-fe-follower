import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessComponent } from './components/process/process.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StageComponent } from './components/stage/stage.component';
import {HttpClientModule} from "@angular/common/http";
import { StageListComponent } from './components/stage-list/stage-list.component';
import {FormsModule} from "@angular/forms";
import { StageOptionsComponent } from './components/stage-options/stage-options.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    ProcessComponent,
    NavbarComponent,
    StageComponent,
    StageListComponent,
    StageOptionsComponent,
    TestComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
