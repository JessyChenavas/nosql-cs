import { Component, OnInit } from '@angular/core';
import { DatabaseStatus } from '../../shared/model/DatabaseStatus';
import { Datasource } from '../../shared/enums/Datasource';
import { DataType } from '../../shared/enums/DataType';
import { Requests } from '../../shared/enums/Requests';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlService } from '../../shared/services/sql.service';
import { NoSqlService } from '../../shared/services/no-sql.service';
import { ProductsFollowers } from '../../shared/model/ProductsFollowers';
import { Observable } from 'rxjs';
import { ProductsFollowerResponse } from '../../shared/model/ProductsFollowerResponse';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  databaseStatus: DatabaseStatus;
  dataSources = Datasource;
  requests = Requests;
  currentRequest = Requests.findProductsByPersonFollowers;
  currentDataSource: string = Datasource.sql;
  findProductByPersonFollowersForm: FormGroup;
  dataSource: ProductsFollowers[];
  displayedColumns: string[] = ['productId', 'productName', 'purchases'];
  resultLoading = false;
  responseTime: number;


  constructor(private fb: FormBuilder, private sqlService: SqlService, private noSqlService: NoSqlService) {
  }

  ngOnInit(): void {
    this.findProductByPersonFollowersForm = this.fb.group({
      person: [1, Validators.required],
      level: [3, Validators.required],
      product: [],
      onlyFirstPersonProducts: [false, Validators.required],
    });
  }

  setDataSource(data: string): void {
    this.currentDataSource = data;
  }

  findProductByPersonFollowers(): void {
    if (this.findProductByPersonFollowersForm.valid) {
      const person = this.findProductByPersonFollowersForm.value.person;
      const level = this.findProductByPersonFollowersForm.value.level;
      const product = this.findProductByPersonFollowersForm.value.product;
      const onlyFirstPersonProducts = this.findProductByPersonFollowersForm.value.onlyFirstPersonProducts;

      this.resultLoading = true;

      let obs;
      if (this.currentDataSource === this.dataSources.sql) {
        obs = this.sqlService.findProductByPersonFollowers(person, level, onlyFirstPersonProducts, product ? product : null);
      } else {
        obs = this.noSqlService.findProductByPersonFollowers(person, level, onlyFirstPersonProducts, product ? product : null);
      }

      obs.subscribe((res: ProductsFollowerResponse) => {
        console.log(res);
        this.responseTime = res.executionTime;
        this.resultLoading = false;
        this.dataSource = res.productsPurchases;
      });
      //  this.openRequestDialog(obs);
    }
  }

}
