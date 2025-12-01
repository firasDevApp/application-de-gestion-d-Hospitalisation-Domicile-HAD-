import { Component } from '@angular/core';

import { Infermier } from "./index/infermier/infermier";
import { SigninSignup } from './pages/auth/signin-signup/signin-signup';

@Component({
  selector: 'app-root',
  imports: [
    SigninSignup
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}