import { Component } from '@angular/core';

import { Infermier } from "./index/infermier/infermier";
import { SigninSignup } from './pages/auth/signin-signup/signin-signup';
import { Admin } from './index/admin/admin';
import { Patient } from "./index/patient/patient";

@Component({
  selector: 'app-root',
  imports: [
    
    Admin
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}