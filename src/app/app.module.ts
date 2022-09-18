import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BlankComponent,
  FooterComponent,
  MainComponent,
  TopBarComponent,
} from '@layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpInterceptorProviders } from '@interceptors';
import { ToastrModule } from 'ngx-toastr';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopBarComponent,
    BlankComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    SharedModule,
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    HttpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
