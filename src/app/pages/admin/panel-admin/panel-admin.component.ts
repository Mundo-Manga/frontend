import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css',
})
export class PanelAdminComponent {
  constructor(private route: Router) {}
  get currentUrl() {
    return this.route.url;
  }
  isActive: boolean = false;
  cambiarActive() {
    this.isActive = !this.isActive;
  }
}
