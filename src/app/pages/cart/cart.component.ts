import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { error } from 'console';
import { HeaderShopComponent } from '../../components/shop/header-shop/header-shop.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderShopComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  detallesCarrito = [
    {
      id: 0,
      cant_producto: 0,
      descripcion: '',
      precio: 0,
      subtotal: 0,
      nombre: '',
    },
  ];
  deleteCart(id_details: number) {
    this.cartService.deletProductCart(id_details).subscribe({
      next: (data) => {
        this.detallesCarrito = this.detallesCarrito.filter(
          (elemento) => elemento.id !== id_details
        );
        this.toastService.error(
          `Producto ${id_details} eliminado exitosamente`,
          'Bye bye'
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  total = this.detallesCarrito.reduce(
    (acc, producto) => acc + producto.subtotal,
    0
  );
  constructor(
    private cartService: CartService,
    private toastService: ToastrService
  ) {
    cartService.getCart().subscribe({
      next: (data) => {
        this.detallesCarrito = data.detalles.map((item: any) => ({
          id: item.id,
          cant_producto: item.cant_producto,
          descripcion: item.producto?.description || '',
          precio: item.producto?.price || 0,
          subtotal: item.subtotal,
          nombre: item.producto?.nombre || '',
        }));
        this.total = this.detallesCarrito.reduce(
          (acc, producto) => acc + producto.subtotal,
          0
        );
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }
  createOrderCart() {
    this.cartService.createOrder(this.detallesCarrito, this.total).subscribe({
      next: (data) => {
        this.detallesCarrito = [
          {
            id: 0,
            cant_producto: 0,
            descripcion: '',
            precio: 0,
            subtotal: 0,
            nombre: '',
          },
        ];
        this.total = 0;
        this.toastService.success('Yupiii', 'Tu pedido ya fue cargado');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
