import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { UsersService } from '../../../services/user/users.service';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css',
})
export class PanelAdminComponent {
  constructor(
    private route: Router,
    private userService: UsersService,
    private router: Router
  ) {}
  get currentUrl() {
    return this.route.url;
  }
  isActive: boolean = false;
  cambiarActive() {
    this.isActive = !this.isActive;
  }
  logout() {
    this.userService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl('/auth');
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
