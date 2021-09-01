import { Component, OnInit } from '@angular/core';

import { CrudProductService } from 'src/app/services/crud-product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  Products:any; //Para almacenar los productos. Any es usado debido a la variedad de datos

  constructor(
    private crudService: CrudProductService
  ) { }

  ngOnInit(): void 
  {
    //El crudService será utilizado para obtener los productos
    this.crudService.getAllProducts().subscribe(result =>{
      console.log(result);
      this.Products = result;
    });
  }

  dropRegister(id:any, iControl:any)
  {
    console.log(id);
    console.log(iControl);
    if (window.confirm("¿Realmente desea eliminar este producto?"))
    {
      this.crudService.dropProduct(id).subscribe((result) =>{
        this.Products.splice(iControl,1);
      });
    }
  }



}
