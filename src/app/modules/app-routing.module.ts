import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from '../components/customer/customer.component';
import { BrokerComponent } from '../components/broker/broker.component';

const routes: Routes = [
  // { path: 'customer-apply', component: CustomerComponent },
  {
    path: ':broker/customer-apply',
    component: CustomerComponent,
  },
  { path: 'broker-apply', component: BrokerComponent },
  { path: '', redirectTo: 'ripe-funding/customer-apply', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
