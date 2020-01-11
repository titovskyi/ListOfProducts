import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TabsModule} from 'ngx-bootstrap/tabs';

import {AddEditListComponent} from './_components/list/add-edit-list/add-edit-list.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatCardModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {AppRoutingModule} from './app-routing.module';
import {AuthorizationComponent} from './_components/authorization/authorization.component';
import {LoginComponent} from './_components/authorization/login/login.component';
import {SignUpComponent} from './_components/authorization/sign-up/sign-up.component';
import {ListsComponent} from './_components/list/lists/lists.component';
import { CategoriesComponent } from './_components/categories/categories.component';
import { ProductsComponent } from './_components/products/products.component';
import { FriendsComponent } from './_components/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    AddEditListComponent,
    LoginComponent,
    SignUpComponent,
    ListsComponent,
    CategoriesComponent,
    ProductsComponent,
    FriendsComponent
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
    MatAutocompleteModule,
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
