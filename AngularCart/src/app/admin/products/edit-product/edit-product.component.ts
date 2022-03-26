import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../product.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  error = false;
  success = false;
  msgs: any = [{severity:'success', summary:'Product saved!', detail:'Your Product is saved!'}];

  // Formly

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( private router: Router, public productService: ProductService ) {

    this.productService.getProductFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });

  }

  ngOnInit(): void {

  }

  save() {
    console.warn(this.model);
    this.productService.create(this.model).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/product']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
