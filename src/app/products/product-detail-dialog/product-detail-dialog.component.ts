import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product.interface';
// Add more Material modules as needed (e.g., MatSelect for "type" in 'profile')

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {
  form!: FormGroup;
  isCreateMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
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
      // Example: keep it simple if you haven't implemented 'profile' yet
      // Or add more controls if needed
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

    // Gather final form data
    const result: Product = {
      ...this.data.product, // keep existing fields if editing
      ...this.form.getRawValue() // getRawValue() because sku might be disabled
    };

    this.dialogRef.close(result);
  }

  onCancel() {
    this.dialogRef.close(null); // user cancels
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