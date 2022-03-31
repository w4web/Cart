import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../product.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  id: any;
  isAdd = true;
  error = false;
  success = false;
  msgs: any = [{severity:'success', summary:'Product saved!', detail:'Your Product is saved!'}];

  // Formly

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( 
    private router: Router, 
    public productService: ProductService, 
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productService.getProductFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.isEdit();
    });

  }

  isEdit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id ) {
      this.productService.find(this.id).subscribe(res => {
        const prod = res['data'];
        this.model = {
          image: prod.image,
          name: prod.name,
          price: prod.price,
          category: prod.category,
          description: prod.description,
        }
        this.isAdd = false;
      });
    } else {
      this.isAdd = true;
      this.model = {};
    }
  }

  save() {
    
    if( this.isAdd == true ) {
      this.addProduct();
    } else {
      this.editProduct();
    }

  }

  addProduct() {
    this.productService.create(this.model).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/product']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  editProduct() {
    this.productService.update(this.id, this.model).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/product']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
