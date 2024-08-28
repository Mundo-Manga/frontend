import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../../../services/user/users.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  constructor(private userService: UsersService) {
    this.loadInitialProducts();
  }

  userList = [
    {
      id: '',
      apellido: '',
      nombre: '',
      nombre_usuario: '',
      correo: '',
      rol: '',
    },
  ];
  indexPage = 1;
  loading = false;

  loadInitialProducts() {
    this.userService.getUsers(1).subscribe({
      next: (data) => {
        this.userList = data.users;
        this.indexPage++;
      },
    });
  }

  /*  deleteProduct(code: string) {
    this.userService.deleteProduct(code).subscribe({
      next: (data) => {
        this.userList = this.userList.filter(
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
  } */

  refreshuserList() {
    this.indexPage = 1; // Reinicia la página
    this.loadInitialProducts();
  }

  getMoreProduct() {
    if (this.loading) return;
    this.loading = true;
    this.userService.getUsers(this.indexPage).subscribe({
      next: (data) => {
        this.userList = [...this.userList, ...data.users];
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
