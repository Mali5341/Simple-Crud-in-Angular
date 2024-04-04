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
  },
  {
    path:'edit-user/:id',
    component:AddUserComponent,
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
