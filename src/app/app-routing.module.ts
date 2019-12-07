import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from './_components/authorization/authorization.component';
import {AuthGuardService} from './_guards/auth-guard.service';
import {AllListsComponent} from './_components/all-lists/all-lists.component';
import {NewListComponent} from './_components/new-list/new-list.component';
import {ProductsComponent} from './_components/products/products.component';
import {FriendsComponent} from './_components/friends/friends.component';
import {CategoriesComponent} from './_components/categories/categories.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'lists'},
  {path: 'lists', component: AllListsComponent, canActivate: [AuthGuardService]},
  {path: 'new-list', component: NewListComponent, canActivate: [AuthGuardService]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'friends', component: FriendsComponent, canActivate: [AuthGuardService]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
  {path: 'auth', component: AuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

