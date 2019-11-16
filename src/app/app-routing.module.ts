import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './_components/home/home.component';
import {AuthorizationComponent} from './_components/authorization/authorization.component';
import {AuthGuardService} from './_guards/auth-guard.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'auth', component: AuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

