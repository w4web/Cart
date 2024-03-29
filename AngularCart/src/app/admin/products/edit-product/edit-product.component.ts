import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../product.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  id: any;
  isAdd = true;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    private router: Router, 
    public productService: ProductService, 
    public msgService: MsgService,
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
        const prod = res['body']['data'];
        this.model = {
          image: prod.image,
          name: prod.name,
          price: prod.price,
          category: prod.category,
          subCategory: prod.subCategory,
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
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Product added successfully!', 2000);
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editProduct() {
    this.productService.update(this.id, this.model).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.msg('success', 'Success!', 'Product edited successfully!', 2000);
        }
        // this.router.navigate(['/admin/product']);
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

}
