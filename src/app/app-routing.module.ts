import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './config/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'auth', canActivate: [AuthGuardService], loadChildren: () => import('../app/landing-page/landing-page.module').then(m => m.LandingPageModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
