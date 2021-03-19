import { Injectable } from '@angular/core';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  responses: Response[] = [];

  constructor() { }

  addResponse(res: Response): void {
    this.responses.push(res);
  }

  getResponses(): Response[] {
    return this.responses;
  }
}
