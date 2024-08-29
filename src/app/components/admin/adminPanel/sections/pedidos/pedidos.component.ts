import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../../../services/order/order.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  confirmOrder(idOrder: string) {
    console.log(idOrder);
    this.orderService.confirmOrder(parseInt(idOrder)).subscribe({
      next: () => {
        this.getOrder();
      },
    });
  }
  deleteOrder(idOrder: string) {
    console.log(idOrder);
    this.orderService.deleteOrder(parseInt(idOrder)).subscribe({
      next: () => {
        this.getOrder();
      },
    });
  }
  load = true;
  pedidos = [
    {
      id: '',
      code: '',
      fecha: '',
      estado: '',
      monto_total: '',
      detalles: [
        {
          productoname: '',
          cantidad: '',
          subtotal: '',
          precio: '',
          description: '',
        },
      ],
      userInfo: { nombre_usuario: '', correo: '', nombre: '', apellido: '' },
    },
  ];
  constructor(private orderService: OrderService) {
    this.getOrder();
  }
  getOrder() {
    this.load = true;
    this.orderService.getOrder().subscribe({
      next: (data) => {
        this.pedidos = data.dataPedidos;
        this.load = false;
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
