import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProcess} from "../_interfaces/IProcess";
import {Observable} from "rxjs";
import {IResponse} from "../_interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getProcessList() {
    return this.httpClient.get('http://localhost:8080/api/process') as Observable<IProcess[]>
  }

  createResponse(response: IResponse) {
    return this.httpClient.post('http://localhost:8080/api/response', response) as Observable<IResponse>
  }
}
