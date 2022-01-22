import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Product } from "./products/product.model";
import { ProductService } from "./products/product.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private productService: ProductService) {}

    storeProducts() {
        const products = this.productService.getProducts();
        this.http
            .put(
                'https://shopbridge-62683-default-rtdb.firebaseio.com/products.json',
                 products
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchProducts() {
            return this.http
            .get<Product[]>(
                'https://shopbridge-62683-default-rtdb.firebaseio.com/products.json',
            )
            .pipe(
                map(products => { // here map is rxjs operator
                    return products.map(product => {
                        return {...product}
                    }); // here map is javascript array method
                }),
                tap(products => {
                    this.productService.setProducts(products);
                })
            );
    }
}