import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../service/product-list.service';
import { SharedMaterial } from '../../shared/shared-material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, SharedMaterial],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['index', 'sku', 'name', 'cost', 'actions'];

  protected readonly productService = inject(ProductService);
  protected readonly router = inject(Router);
  protected readonly dialog = inject(MatDialog);


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {

        this.dataSource.data = data;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  onCreateNew() {
    // Open dialog in create mode
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      width: '900px',
      height: '700px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false,
      data: { product: {} } // empty product object
    });

    // Wait for result
    dialogRef.afterClosed().subscribe((result: Product | null) => {
      if (result) {
        // If not null, user saved
        this.productService.createProduct(result).subscribe({
          next: () => {
            alert('Product created successfully');
            this.loadProducts();
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  onEditProduct(product: Product) {
    // Open dialog in edit mode
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      width: '900px',
      height: '700px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false,
      data: { product }
    });

    dialogRef.afterClosed().subscribe((updated: Product | null) => {
      if (updated && updated.id) {
        // Patch existing
        const partialUpdate = {
          name: updated.name,
          description: updated.description,
          cost: updated.cost
          // profile, if you have it
        };
        this.productService.updateProduct(updated.id, partialUpdate).subscribe({
          next: () => {
            alert('Product updated successfully');
            this.loadProducts();
          },
          error: (err) => console.error(err)
        });
      }
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // mat-table uses lowercase for filter matching
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
