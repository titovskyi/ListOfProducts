import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TabsModule} from 'ngx-bootstrap/tabs';

import {NewListComponent} from './_components/new-list/new-list.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatCardModule} from '@angular/material';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {HomeComponent} from './_components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthorizationComponent} from './_components/authorization/authorization.component';
import {LoginComponent} from './_components/authorization/login/login.component';
import {SignUpComponent} from './_components/authorization/sign-up/sign-up.component';
import {AllListsComponent} from './_components/all-lists/all-lists.component';
import { CategoriesComponent } from './_components/categories/categories.component';
import { ProductsComponent } from './_components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HomeComponent,
    NewListComponent,
    LoginComponent,
    SignUpComponent,
    AllListsComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    TabsModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
