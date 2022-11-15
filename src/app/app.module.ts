import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessComponent } from './components/process/process.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StageComponent } from './components/stage/stage.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    ProcessComponent,
    NavbarComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
