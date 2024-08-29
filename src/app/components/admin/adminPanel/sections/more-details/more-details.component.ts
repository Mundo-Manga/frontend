import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more-details',
  standalone: true,
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'],
})
export class MoreDetailsComponent implements OnInit {
  pedidoCode: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pedidoCode = params['code'];
      console.log('Pedido Code:', this.pedidoCode);
    });
  }
}
