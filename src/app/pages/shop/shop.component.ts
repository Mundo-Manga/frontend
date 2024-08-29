import { Component } from '@angular/core';
import { NavShopComponent } from '../../components/shop/nav/nav.component';
import { HeaderShopComponent } from '../../components/shop/header-shop/header-shop.component';
import { CRUDProductService } from '../../services/product/crud-product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NavShopComponent, NgClass, NgIf, HeaderShopComponent, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  load = true;
  productList = [
    {
      code_producto: '',
      description: undefined,
      id: undefined,
      nombre: '',
      price: undefined,
      stock: undefined,
    },
  ];
  indexPage = 1;
  loading = false;

  constructor(
    private serviceProduct: CRUDProductService,
    private toastService: ToastrService,
    private cartService: CartService
  ) {
    this.loadInitialProducts();
  }

  loadInitialProducts() {
    this.serviceProduct.getProduct(1).subscribe({
      next: (data) => {
        this.productList = data.productos;
        this.indexPage++;
        this.load = false;
      },
    });
  }

  refreshProductList() {
    this.indexPage = 1;
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
  btnActive = true;
  addCart(code: string, name: string) {
    if (this.btnActive) {
      this.btnActive = false;

      const input = document.getElementById(
        `cantProduct_${code}`
      ) as HTMLInputElement;
      this.cartService.addCart(code, parseInt(input.value)).subscribe({
        next: (data) => {
          this.toastService.success(`Producto ${name} agregado al carrito`);
        },
        error: (err) => {
          console.error({ err });
        },
        complete: () => {
          this.btnActive = true;
        },
      });
    }
  }
}
