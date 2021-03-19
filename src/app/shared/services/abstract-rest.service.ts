import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseStatus } from '../model/DatabaseStatus';

@Injectable({
  providedIn: 'root'
})
export class AbstractRestService {
  protected uri = '';

  constructor(
    protected http: HttpClient,
    protected prefixUri: string,
  ) {
    this.uri = this.uri.concat(this.prefixUri);
  }

  insertPersons(nbPerson = 0, batchSize = 0): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('number', nbPerson.toString())
      .set('batchSize', batchSize.toString());

    return this.http.post<any>(
      this.uri.concat('/insert/persons'),
      {}, {
        params
      }
    );
  }

  insertProducts(nbProducts = 0): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('number', nbProducts.toString());

    return this.http.post<any>(
      this.uri.concat('/insert/products'),
      {}, {
        params
      }
    );
  }

  insertFriends(min = 0, max = 0, batchSize = 0): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('min', min.toString())
      .set('max', max.toString())
      .set('batchSize', batchSize.toString());

    return this.http.post<any>(
      this.uri.concat('/insert/friends'),
      {}, {
        params
      }
    );
  }

  insertPurchases(min = 0, max = 0, batchSize = 0): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('min', min.toString())
      .set('max', max.toString())
      .set('batchSize', batchSize.toString());

    return this.http.post<any>(
      this.uri.concat('/insert/purchases'),
      {}, {
        params
      }
    );
  }

  reset(): Observable<any> {
    return this.http.post<any>(
      this.uri.concat('/reset'), {}
    );
  }

  status(): Observable<DatabaseStatus> {
    return this.http.get<DatabaseStatus>(
      this.uri.concat('/status'), {}
    );
  }

  findProductByPersonFollowers(personId = 0, level = 0, onlyFirstPersonProducts = false, productId = 0): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('person', personId.toString())
      .set('level', level.toString())
      .set('onlyFirstPersonProducts', onlyFirstPersonProducts.toString());

    if (productId !== undefined && productId != null) {
      params = params.set('product', productId.toString());
    }

    return this.http.post<any>(
      this.uri.concat('/get/products-follow'),
      {}, {
        params
      }
    );
  }
}
