import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import SharedModule from './modules/shared.module';

// Interceptors
import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { ApiApplyComponent } from './components/api-apply/api-apply.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';

// Custom dependencies
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Components
import { RegistrationComponent } from './components/api-apply/registration/registration.component';
import { AuthenticationComponent } from './components/api-apply/authentication/authentication.component';
import { GetOfferComponent } from './components/api-apply/get-offer/get-offer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiApplyComponent,
    ClientLoginComponent,
    RegistrationComponent,
    AuthenticationComponent,
    GetOfferComponent,
    LoadingComponent,
    ModalErrorComponent,
    DialogComponent,
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
