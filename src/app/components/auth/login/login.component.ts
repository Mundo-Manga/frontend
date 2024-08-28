import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  ngOnInit(): void {}
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  seePassword = false;
  setSeePassword() {
    this.seePassword = !this.seePassword;
  }

  btnActive: boolean = true;
  login() {
    if (this.loginForm.valid && this.btnActive) {
      this.btnActive = false;
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.loginForm.reset();
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          if (error.error?.error === 'NonExistingUser') {
            this.loginForm
              .get('username')
              ?.setErrors({ nonExistingUser: true });
          } else if (error.error?.error == 'PasswordIncorrect') {
            this.loginForm
              .get('password')
              ?.setErrors({ passwordIncorrect: true });
          }
          this.btnActive = true;
          console.error('Error: ', error);
        },
        complete: () => console.log('Yupi'),
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  get f() {
    return this.loginForm.controls;
  }
}
