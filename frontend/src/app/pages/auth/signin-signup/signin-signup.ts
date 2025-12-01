import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin-signup.html',
  styleUrls: ['./signin-signup.css']
})
export class SigninSignup implements OnInit {
  isSignUpMode = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  signInError = '';
  signUpError = '';

  constructor(private fb: FormBuilder) {
    // Formulaire de connexion - utiliser 'email' au lieu de 'username'
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Changé de 'username' à 'email'
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulaire d'inscription - ajouter les champs manquants
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      cin: ['', [Validators.required]], // Ajouté
      gouvernorat: ['', [Validators.required]], // Ajouté
      adresse: ['', [Validators.required]], // Ajouté
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  switchToSignUp(): void {
    this.isSignUpMode = true;
    this.signInError = '';
    this.signUpError = '';
  }

  switchToSignIn(): void {
    this.isSignUpMode = false;
    this.signInError = '';
    this.signUpError = '';
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      const formValue = this.signInForm.value;
      console.log('Sign In Attempt:', formValue);
      
      // Ici vous pouvez appeler votre service d'authentification
      // this.authService.signIn(formValue).subscribe(...)
      
      // Exemple de gestion d'erreur
      // this.signInError = 'Invalid credentials';
    }
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;
      console.log('Sign Up Attempt:', formValue);
      
      // Ici vous pouvez appeler votre service d'inscription
      // this.authService.signUp(formValue).subscribe(...)
      
      // Exemple de succès
      // this.switchToSignIn();
      // this.signUpForm.reset();
    }
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
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