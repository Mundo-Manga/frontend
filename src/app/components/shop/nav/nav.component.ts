import { Component } from '@angular/core';
import { UsersService } from '../../../services/user/users.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { NgIf } from '@angular/common';

@Component({
  selector: 'nav-shop',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavShopComponent {
  linkAdmin = false;
  constructor(private userService: UsersService, private router: Router) {
    userService.getRole().subscribe({
      next: (data) => {
        if (data.role == 'admin') {
          this.linkAdmin = true;
        }
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
  logout() {
    this.userService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
