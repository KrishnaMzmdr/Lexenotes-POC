import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewUserComponent } from './new-user/new-user.component';
 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
	
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent, 
	NewUserComponent
  ]
})
export class AdminModule { }
