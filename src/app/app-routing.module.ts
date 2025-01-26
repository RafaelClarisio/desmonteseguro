import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';  // Supondo que você tenha um guard para proteger a rota

const routes: Routes = [
  { path: '', component: LoginComponent }, // Rota para o login
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Rota para home com proteção de autenticação
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
