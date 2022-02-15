import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import SharedModule from './modules/shared.module';

// Interceptors
import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';

// Custom dependencies
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Components
import { RegistrationComponent } from './components/customer/registration/registration.component';
import { AuthenticationComponent } from './components/customer/authentication/authentication.component';
import { GetOfferComponent } from './components/customer/get-offer/get-offer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ModalErrorComponent } from './components/shared/modal-error/modal-error.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { BrokerComponent } from './components/broker/broker.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RegistrationComponent,
    AuthenticationComponent,
    GetOfferComponent,
    LoadingComponent,
    ModalErrorComponent,
    DialogComponent,
    BrokerComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Using for ngx-mask
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
