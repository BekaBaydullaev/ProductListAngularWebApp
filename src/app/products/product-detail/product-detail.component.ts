import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../service/product-list.service';
import { Product } from '../../interfaces/product.interface';
import { SharedMaterial } from '../../shared/shared-material.module';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterial
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    sku: '',
    cost: 0,
    profile: {}
  };
  isCreateMode = false;

  protected readonly productService = inject(ProductService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Editing existing product
      this.loadProduct(parseInt(id, 10));
    } else {
      // Creating a new product
      this.isCreateMode = true;
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => alert('Error loading product: ' + err)
    });
  }

  onSubmit() {
    if (this.isCreateMode) {
      // Create
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          alert('Product created successfully.');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Create failed: ' + err)
      });
    } else {
      // Edit
      const productId = this.product.id;
      if (!productId) return;

      const partialUpdate = {
        name: this.product.name,
        description: this.product.description,
        cost: this.product.cost,
        profile: this.product.profile
      };

      this.productService.updateProduct(productId, partialUpdate).subscribe({
        next: () => {
          alert('Product updated successfully.');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Update failed: ' + err)
      });
    }
  }
  
  onCancel() {
    this.router.navigate(['/products']);
  }
}
