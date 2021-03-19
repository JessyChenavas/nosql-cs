import { Injectable } from '@angular/core';
import { AbstractRestService } from './abstract-rest.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoSqlService extends AbstractRestService {

  constructor(protected http: HttpClient) {
    super(http, '/api/nosql');
  }
}
