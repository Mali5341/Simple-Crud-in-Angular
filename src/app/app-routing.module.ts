import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-details',
    pathMatch: 'full'
  },
  {
    path:'add-user',
    component:AddUserComponent,
    data: {
      pageHeading: 'Add New Employee',
      showHeader: false,
      showFooter: false,
    },
    title: 'Add User'
  },
  {
    path:'edit-user/:id',
    component:AddUserComponent,
    data: {
      pageHeading: 'Edit User'
    },
    title: "Edit Employee"
  },
  {
    path:"user-details", 
    component:UserDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
