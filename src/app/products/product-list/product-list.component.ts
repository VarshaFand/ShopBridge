import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      )
    this.products = this.productService.getProducts();
  }

  onNewProduct() {
    console.log(this.route);
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
