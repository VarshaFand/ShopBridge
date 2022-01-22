import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if(this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let productName = '';
    let productDescription = '';
    let productPrice = '';

    if(this.editMode) {
      const product = this.productService.getProduct(this.id);
      productName = product.name;
      productDescription = product.description;
      productPrice = (product.price).toString();
    }
    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'description': new FormControl(productDescription, Validators.required),
      'price': new FormControl(productPrice, Validators.required),
    });
  }

}
