import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormAddProductComponent } from '../../components/dashboard/form-add-product/form-add-product.component';
import { CRUDProductService } from '../../../../../services/product/crud-product.service';
import { elementAt } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { table } from 'console';
import { OrderService } from '../../../../../services/order/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, NgFor, FormAddProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  load = true;
  productList = [
    {
      code_producto: '',
      description: undefined,
      id: undefined,
      nombre: undefined,
      price: undefined,
      stock: undefined,
    },
  ];
  indexPage = 1;
  loading = false;

  countTypeOrder = {
    totalOrders: undefined,
    pendingOrders: undefined,
    confirmedOrders: undefined,
  };
  constructor(
    private serviceProduct: CRUDProductService,
    private toastService: ToastrService,
    private serviceOrder: OrderService
  ) {
    this.loadInitialProducts();
    serviceOrder.getCountOrder().subscribe({
      next: (data) => {
        this.countTypeOrder = data;
        this.load = false;
      },
    });
  }

  loadInitialProducts() {
    this.serviceProduct.getProduct(1).subscribe({
      next: (data) => {
        this.productList = data.productos;
        this.indexPage++;
      },
    });
  }

  deleteProduct(code: string) {
    this.serviceProduct.deleteProduct(code).subscribe({
      next: (data) => {
        this.productList = this.productList.filter(
          (elemento) => elemento.code_producto !== code
        );
        this.toastService.error(
          `Producto ${code} eliminado exitosamente`,
          'Bye bye'
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  refreshProductList() {
    this.indexPage = 1; // Reinicia la página
    this.loadInitialProducts();
  }

  getMoreProduct() {
    if (this.loading) return;
    this.loading = true;
    this.serviceProduct.getProduct(this.indexPage).subscribe({
      next: (data) => {
        this.productList = [...this.productList, ...data.productos];
        this.indexPage++;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onScroll(event: any) {
    const threshold = 100;
    const position = event.target.scrollTop + event.target.offsetHeight;
    const height = event.target.scrollHeight;

    if (position > height - threshold) {
      this.getMoreProduct();
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
