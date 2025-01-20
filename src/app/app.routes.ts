import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailDialogComponent } from './products/product-detail-dialog/product-detail-dialog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'product/:id', component: ProductDetailDialogComponent },
    { path: 'create', component: ProductDetailDialogComponent }
  ];
