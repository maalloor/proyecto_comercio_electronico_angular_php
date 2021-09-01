import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudProductService } from 'src/app/services/crud-product.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  catch_id:any;
  formProduct: FormGroup;

  constructor(
    private on_route:ActivatedRoute,
    private crudService:CrudProductService,
    public form:FormBuilder,
    private ruteo:Router
  ) { 
    this.catch_id = this.on_route.snapshot.paramMap.get('id');
    console.log(this.catch_id);

    this.crudService.getProduct(this.catch_id).subscribe(result =>{
      console.log(result);
      this.formProduct.setValue({
        name: result[0]['nombre'],
        description: result[0]['descripcion'],
        price: result[0]['precio'],
        size: result[0]['talla'],
        category: result[0]['categoria']
      });
    });

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

  sendData():any
  {
    console.log(this.catch_id);
    console.log(this.formProduct.value);
    this.crudService.editProduct(this.catch_id,this.formProduct.value).subscribe(()=>{
      this.ruteo.navigateByUrl('/index');
    });
  }
}
