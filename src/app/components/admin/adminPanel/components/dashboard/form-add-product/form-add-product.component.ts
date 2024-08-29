import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CRUDProductService } from '../../../../../../services/product/crud-product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-add-product',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-add-product.component.html',
  styleUrl: './form-add-product.component.css',
})
export class FormAddProductComponent implements OnInit {
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: [''],
  });
  btnActive: boolean = true;
  addProduct() {
    if (this.productForm.valid && this.btnActive) {
      this.btnActive = false;
      const form = this.productForm.value;
      this.serviceProduct
        .addProduct({
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          code: this.codigoProducto,
        })
        .subscribe({
          next: (data) => {
            this.serviceProduct.getCode().subscribe({
              next: (data) => {
                this.codigoProducto = data.codeProducto;
                this.toastService.success(
                  'Producto agregado exitosamente',
                  'Yupi'
                );
              },
            });
            this.productForm.reset();
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            this.btnActive = true;
          },
        });
    } else {
      this.btnActive = true;
      this.productForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {}
  deportes: any = [
    'Senderismo',
    'Ciclismo',
    'Escalada',
    'Surf',
    'Esquí',
    'Snowboard',
    'Correr',
    'Camping',
    'Natación',
    'Golf',
    'Futbol',
    'Rugby',
    'Voleibol',
    'Tennis',
  ];
  codigoProducto: string = '';
  constructor(
    private serviceProduct: CRUDProductService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) {
    this.serviceProduct.getCode().subscribe({
      next: (data) => {
        this.codigoProducto = data.codeProducto;
      },
      error: (err) => {
        console.error('Error', { err });
      },
    });
  }

  get f() {
    return this.productForm.controls;
  }
  /* 
  ///Esto era para probar un selector de multiples categorias
  categories: any = ['futbol', 'rugby', 'voley'];
  addCategories(categorie: string) {
    if (this.categories.includes(categorie)) {
      this.categories = this.categories.filter(
        (item: string) => item !== categorie
      );
    } else {
      this.categories.push(categorie);
    }
  }
  removeCategories(categorie: string) {
    this.categories = this.categories.filter(
      (item: string) => item !== categorie
    );
  }
  isActiveShowSelect = true;
  showSelect() {
    this.isActiveShowSelect = !this.isActiveShowSelect;
  } */
}
