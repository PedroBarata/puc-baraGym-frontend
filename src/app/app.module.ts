import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "../../node_modules/@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AlertModule } from './common/components/alert/alert.module';
import { LoadGlobalModule } from './common/components/load-global/load-global.module';
import { GlobalLoadingInterceptor } from './common/interceptors/global-loading.interceptor';
import { ServerErrorInterceptor } from './common/interceptors/server-error.interceptor';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule,
    LoadGlobalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalLoadingInterceptor,
      multi: true,
   },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

