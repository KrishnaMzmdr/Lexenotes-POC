import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,//Add if needed 
   FormsModule, 
    AuthRoutingModule
  ],
  declarations: [LoginComponent,GeneratePasswordComponent]
})
export class AuthModule { }
