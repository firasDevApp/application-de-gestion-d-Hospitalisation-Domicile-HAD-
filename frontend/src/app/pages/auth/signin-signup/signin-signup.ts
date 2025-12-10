import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './signin-signup.html',
  styleUrls: ['./signin-signup.css']
})
export class SigninSignup {

  isSignUpMode = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  signInError = '';
  signUpError = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      cin: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(control: AbstractControl) {
    const p = control.get('password');
    const cp = control.get('confirmPassword');

    return p && cp && p.value !== cp.value ? { passwordMismatch: true } : null;
  }

  switchToSignUp() {
    this.isSignUpMode = true;
    this.signInError = '';
  }

  switchToSignIn() {
    this.isSignUpMode = false;
    this.signUpError = '';
  }

 onSignIn() {
  if (!this.signInForm.valid) return;

  console.log("LOGIN REQUEST:", this.signInForm.value);

  this.authService.login(this.signInForm.value).subscribe({
    next: (res) => {
      console.log("LOGIN SUCCESS:", res);
      this.router.navigate(['/patient/home']);
    },
    error: (err) => {
      console.error("LOGIN ERROR:", err);
      this.signInError = err.error?.message || 'Erreur de connexion';
    }
  });
}


  onSignUp() {
    if (!this.signUpForm.valid) return;

    this.authService.register(this.signUpForm.value).subscribe({
      next: () => {
        alert("Compte créé 🎉");
        this.switchToSignIn();
      },
      error: err => this.signUpError = err.error?.msg || 'Erreur lors de l’inscription'
    });
  }

  get signInEmail() { return this.signInForm.get('email'); }
  get signInPassword() { return this.signInForm.get('password'); }
  get signUpUsername() { return this.signUpForm.get('username'); }
  get signUpCin() { return this.signUpForm.get('cin'); }
  get signUpGouvernorat() { return this.signUpForm.get('gouvernorat'); }
  get signUpAdresse() { return this.signUpForm.get('adresse'); }
  get signUpEmail() { return this.signUpForm.get('email'); }
  get signUpPassword() { return this.signUpForm.get('password'); }
  get signUpConfirmPassword() { return this.signUpForm.get('confirmPassword'); }

}
