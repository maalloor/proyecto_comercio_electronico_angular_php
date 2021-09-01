import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CrudProductService } from 'src/app/services/crud-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formProduct: FormGroup;

  constructor(
    public form:FormBuilder,
    private crudService:CrudProductService,
    private ruteo:Router
    ) { 
    this.formProduct = this.form.group({
      name: [''],
      description: [''],
      price: [''],
      size: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
  }

  //sendData() recibe cualquier información con any
  sendData(): any {
    console.log(this.formProduct.value);
    this.crudService.addProduct(this.formProduct.value).subscribe(result=>{
      //Cuando se realiza la instruccion se actualiza la lista de productos
      this.ruteo.navigateByUrl('/index');
    });
  }

}
