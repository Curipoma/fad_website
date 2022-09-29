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
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ConfigComponent } from './layout/config/config.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MenuitemComponent } from './layout/menuitem/menuitem.component';
import { ProgressBarModule } from 'primeng/progressbar';

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
    SidebarComponent,
    ConfigComponent,
    MenuComponent,
    MenuitemComponent,
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
    MenubarModule,
    MegaMenuModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    RippleModule,
    MessagesModule,
    ToastModule,
    ReactiveFormsModule,
    ProgressBarModule,
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    HttpInterceptorProviders,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
