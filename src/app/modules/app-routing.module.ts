import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from '../components/customer/customer.component';
import { BrokerComponent } from '../components/broker/broker.component';
import { NotFoundComponent } from '../components/common/not-found/not-found.component';

const routes: Routes = [
  // { path: 'customer-apply', component: CustomerComponent },
  {
    path: '**',
    redirectTo: '/404',
  },
  // {
  //   path: ':broker/customer-apply',
  //   component: CustomerComponent,
  // },
  // { path: 'broker-apply', component: BrokerComponent },
  // { path: '', redirectTo: 'ripe-funding/customer-apply', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  // {
  //   path: '**',
  //   redirectTo: '/404',
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
