import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from '../../shared/model/Response';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  success = false;
  error = false;
  loading = true;
  response: Response;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public appState: AppStateService) {
  }

  ngOnInit(): void {
    console.log("Subscribe to obs");

    this.data.observable.subscribe((res: Response) => {
      this.loading = false;
      this.success = true;
      this.response = res;
      this.appState.addResponse(res);
      console.log(res);
    }, err => {
      console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

}
