import { Component } from '@angular/core';
import { HeaderShopComponent } from '../../components/shop/header-shop/header-shop.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderShopComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
