/*
Author: Krishna
This page is used for admin page routing 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { NewUserComponent } from './new-user/new-user.component'; 
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent, 
    children: [
      {
      path: '',
      children: [ 
        { path: 'dashboard', component: AdminDashboardComponent },
		 { path: 'createuser', component: NewUserComponent },
		 { path: 'edituser/:id', component: EditUserComponent }
      ],
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
