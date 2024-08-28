import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirPassword = control.get('confirPassword');

  if (password && confirPassword && password.value !== confirPassword.value) {
    confirPassword.setErrors({ passwordsMismatch: true });
    return { passwordsMismatch: true };
  } else {
    if (confirPassword?.hasError('passwordsMismatch')) {
      confirPassword.setErrors(null);
    }
    return null;
  }
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}
  seePassword = false;
  setSeePassword() {
    this.seePassword = !this.seePassword;
  }

  btnActive: boolean = true;
  register() {
    if (this.registerForm.valid && this.btnActive) {
      this.btnActive = false;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (data) => {
          this.registerForm.reset();
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          if (error.error?.error === 'ExistingUserAndEmail') {
            this.registerForm.get('email')?.setErrors({ emailExists: true });
            this.registerForm
              .get('username')
              ?.setErrors({ usernameExists: true });
          } else if (error.error?.error === 'ExistingUser') {
            this.registerForm
              .get('username')
              ?.setErrors({ usernameExists: true });
          } else if (error.error?.error === 'ExistingEmail') {
            this.registerForm.get('email')?.setErrors({ emailExists: true });
          }

          this.btnActive = true;
          console.error('Error: ', error);
        },
        complete: () => console.log('Yupi'),
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
