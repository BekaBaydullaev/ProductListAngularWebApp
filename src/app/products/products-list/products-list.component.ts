import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../service/product-list.service';
import { SharedMaterial } from '../../shared/shared-material.module';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, SharedMaterial],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['index', 'sku', 'name', 'cost', 'actions'];

  protected readonly productService = inject(ProductService);
  protected readonly router = inject(Router);


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => alert('Failed to load products: ' + err)
    });
  }

  onCreateNew() {
    this.router.navigate(['/create']);
  }

  onEditProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  onDeleteProduct(productId: number, productName: string) {
    const confirmation = confirm(`Are you sure you want to delete product [${productName}]?`);
    if (!confirmation) return;
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted successfully.');
        this.loadProducts();
      },
      error: (err) => alert('Delete failed: ' + err)
    });
  }
}
