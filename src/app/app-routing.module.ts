import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from './_components/authorization/authorization.component';
import {AuthGuardService} from './_guards/auth-guard.service';
import {ListsComponent} from './_components/list/lists/lists.component';
import {AddEditListComponent} from './_components/list/add-edit-list/add-edit-list.component';
import {ProductsComponent} from './_components/products/products.component';
import {FriendsComponent} from './_components/friends/friends.component';
import {CategoriesComponent} from './_components/categories/categories.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'lists'},
  {path: 'lists', component: ListsComponent, canActivate: [AuthGuardService]},
  {path: 'add-edit-list', component: AddEditListComponent, canActivate: [AuthGuardService]},
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

