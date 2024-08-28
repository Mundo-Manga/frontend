import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PanelAdminComponent } from './pages/admin/panel-admin/panel-admin.component';
import { DashboardComponent } from './components/admin/adminPanel/sections/dashboard/dashboard.component';
import { PedidosComponent } from './components/admin/adminPanel/sections/pedidos/pedidos.component';
import { UsuariosComponent } from './components/admin/adminPanel/sections/usuarios/usuarios.component';
import { MoreDetailsComponent } from './components/admin/adminPanel/sections/more-details/more-details.component';
import { NgModule } from '@angular/core';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { hasRoleGuard } from './guards/logged/has-rol.guard';
import { verifyRoleGuard } from './guards/role/verify-role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [verifyRoleGuard],
    component: PanelAdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'moreDetails',
        component: MoreDetailsComponent,
      },
    ],
  },
  {
    path: 'productos',
    canActivate: [hasRoleGuard],
    component: PanelAdminComponent,
    children: [{ path: 'sad', component: UsuariosComponent }],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  { path: 'page-not-found-404', component: NotFoundPageComponent },
  { path: '**', redirectTo: 'page-not-found-404' },
];
