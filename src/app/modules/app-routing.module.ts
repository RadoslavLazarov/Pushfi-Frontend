import { ClientLoginComponent } from '../components/client-login/client-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ApiApplyComponent } from '../components/api-apply/api-apply.component';


const routes: Routes = [
  { path: 'api-apply', component: ApiApplyComponent },
  { path: 'crm/client-login', component: ClientLoginComponent },
  { path: '', redirectTo: '/api-apply', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
