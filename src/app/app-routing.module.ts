import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ProductStartComponent } from "./products/product-start/product-start.component";
import { ProductsComponent } from "./products/products.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {path: 'products', component: ProductsComponent,
     children: [
        { path: '', component: ProductStartComponent},
        { path: 'new', component: ProductEditComponent},
        { 
            path: ':id', 
            component: ProductDetailComponent,
        },
        { 
            path: ':id/edit', 
            component: ProductEditComponent, 
        }
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}