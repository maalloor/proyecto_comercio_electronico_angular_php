import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from './Product';



@Injectable({
  providedIn: 'root'
})
export class CrudProductService {

  API: string = 'http://localhost:3000/products/'; //La API de PHP

  constructor(private clientHttp: HttpClient) { }

  
  addProduct(dataProduct:Product):Observable<any>
  {
    return this.clientHttp.post(this.API+"?create=1",dataProduct);
  }

  getAllProducts()
  {
    return this.clientHttp.get(this.API);
  }

  getProduct(id:any):Observable<any>
  {
    return this.clientHttp.get(this.API+'?read='+id);
  }

  dropProduct(id:any):Observable<any>
  {
    return this.clientHttp.get(this.API+'?delete='+id);
  }

  editProduct(id:any,dataProduct:Product):Observable<any>
  {
    return this.clientHttp.post(this.API+"?update="+id,dataProduct);
  }

  
}
