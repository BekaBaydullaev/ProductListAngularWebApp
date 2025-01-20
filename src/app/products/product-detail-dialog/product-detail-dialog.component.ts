import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../service/product-list.service';
import { NotificationService } from '../../service/notification-dialog.service';
import { NotificationType } from '../../interfaces/notification-dialog-data.interface';
import { SharedMaterial } from '../../shared/shared-material.module';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterial
  ],
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {
  form!: FormGroup;
  isCreateMode = false;

  protected readonly fb = inject(FormBuilder);
  protected readonly dialogRef = inject(MatDialogRef<ProductDetailDialogComponent>);
  protected readonly productService = inject(ProductService);
  protected readonly notificationService = inject(NotificationService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product },
  ) {}

  ngOnInit() {
    const product = this.data?.product;
    this.isCreateMode = !product?.id; // If no 'id', we assume it's a new product

    this.form = this.fb.group({
      name: [product?.name ?? '', [Validators.required]],
      description: [product?.description ?? ''],
      sku: [product?.sku ?? '', [Validators.required]],
      cost: [
        product?.cost ?? 0, 
        [Validators.required, Validators.min(0.01), Validators.max(9999999)]
      ],
    });

    // If editing an existing product, we disable 'sku' field if you don't allow changes:
    if (!this.isCreateMode) {
      this.form.controls['sku'].disable();
    }
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.getRawValue();

    if (this.isCreateMode) {
      this.createProduct(formData);
    } else {
      this.updateProduct(formData);
    }
  }

  private createProduct(formData: Product) {
    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.notificationService.showNotification(
          NotificationType.Success,
          'Product created successfully',
          'Create'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notificationService.showNotification(
          NotificationType.Error,
          'Failed to create product: ' + error,
          'Error'
        );
      }
    });
  }

  private updateProduct(formData: Product) {
    if (!this.data.product?.id) return;

    const updateData = {
      name: formData.name,
      description: formData.description,
      cost: formData.cost
    };

    this.productService.updateProduct(this.data.product.id, updateData).subscribe({
      next: () => {
        this.notificationService.showNotification(
          NotificationType.Success,
          'Product updated successfully',
          'Update'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notificationService.showNotification(
          NotificationType.Error,
          'Failed to update product: ' + error,
          'Error'
        );
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false); // user cancels
  }

  // A helper getter to easily check validation
  get f() {
    return {
      name: this.form.get('name'),
      description: this.form.get('description'),
      sku: this.form.get('sku'),
      cost: this.form.get('cost')
    };
  }
}