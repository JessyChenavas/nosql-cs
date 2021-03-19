import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlService } from '../../shared/services/sql.service';
import { NoSqlService } from '../../shared/services/no-sql.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Datasource } from '../../shared/enums/Datasource';
import { DataType } from '../../shared/enums/DataType';
import { DatabaseStatus } from '../../shared/model/DatabaseStatus';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  databaseStatus: DatabaseStatus;
  dataSources = Datasource;
  tabs = DataType;
  currentInsertTab = DataType.persons;
  currentDataSource: string = Datasource.sql;

  personsForm: FormGroup;
  productForm: FormGroup;
  friendsOrPurchaseForm: FormGroup;

  constructor(private fb: FormBuilder, private sqlService: SqlService, private noSqlService: NoSqlService, private dialog: MatDialog, public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.reloadStatus();

    this.personsForm = this.fb.group({
      number: [10000, Validators.required],
      batchSize: [1000, Validators.required]
    });

    this.productForm = this.fb.group({
      number: [1000, Validators.required],
    });

    this.friendsOrPurchaseForm = this.fb.group({
      min: [0, Validators.required],
      max: [20, Validators.required],
      batchSize: [10000, Validators.required],
    });
  }

  reloadStatus(): void {
    if (this.currentDataSource === this.dataSources.sql) {
      this.sqlService.status().subscribe(res => {
        this.databaseStatus = res;
      });
    } else {
      this.noSqlService.status().subscribe(res => {
        this.databaseStatus = res;
      });
    }
  }

  setDataSource(data: string): void {
    this.currentDataSource = data;
    this.reloadStatus();

  }

  openRequestDialog(obs: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        observable: obs
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadStatus();
    });
  }

  reset(): void {
    let obs;
    if (this.currentDataSource === this.dataSources.sql) {
      obs = this.sqlService.reset();
    } else {
      obs = this.noSqlService.reset();
    }
    this.openRequestDialog(obs);
  }

  insertPersons(): void {
    if (this.personsForm.valid) {
      const nbPersons = this.personsForm.value.number;
      const batchSize = this.personsForm.value.batchSize;

      let obs;
      if (this.currentDataSource === this.dataSources.sql) {
        obs = this.sqlService.insertPersons(nbPersons, batchSize);
      } else {
        obs = this.noSqlService.insertPersons(nbPersons, batchSize);
      }
      this.openRequestDialog(obs);
    }
  }

  insertProducts(): void {
    if (this.productForm.valid) {
      const nbProducts = this.productForm.value.number;

      let obs;
      if (this.currentDataSource === this.dataSources.sql) {
        obs = this.sqlService.insertProducts(nbProducts);
      } else {
        obs = this.noSqlService.insertProducts(nbProducts);
      }
      this.openRequestDialog(obs);
    }
  }

  insertFriends(): void {
    if (this.friendsOrPurchaseForm.valid) {
      const min = this.friendsOrPurchaseForm.value.min;
      const max = this.friendsOrPurchaseForm.value.max;
      const batchSize = this.friendsOrPurchaseForm.value.batchSize;

      let obs;
      if (this.currentDataSource === this.dataSources.sql) {
        obs = this.sqlService.insertFriends(min, max, batchSize);
      } else {
        obs = this.noSqlService.insertFriends(min, max, batchSize);
      }
      this.openRequestDialog(obs);
    }
  }

  insertPurchases(): void {
    if (this.friendsOrPurchaseForm.valid) {
      const min = this.friendsOrPurchaseForm.value.min;
      const max = this.friendsOrPurchaseForm.value.max;
      const batchSize = this.friendsOrPurchaseForm.value.batchSize;

      let obs;
      if (this.currentDataSource === this.dataSources.sql) {
        obs = this.sqlService.insertPurchases(min, max, batchSize);
      } else {
        obs = this.noSqlService.insertPurchases(min, max, batchSize);
      }
      this.openRequestDialog(obs);
    }
  }

}
