import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {StartComponent} from './components/start/pages/start/start.component';
import { NoAuthGuard } from './no-auth.guard';
import {AuthGuard} from './auth.guard';
import { UidvalidationComponent } from './components/uidvalidation/uidvalidation.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'uidvalidation/:uid',
    component: UidvalidationComponent,
  },
  {
    path: 'sign',
    loadChildren: () => import('./modules/sign/sign-routing.module').then(mod => mod.SignRoutingModule),
  },
  {
    path: 'funnel',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/funnel/funnel-routing.module').then(mod => mod.FunnelRoutingModule),
  },
  {
    path: 'menu',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin-menu/admin-menu-routing.module').then(mod => mod.AdminMenuRoutingModule),
  },
  {
    path: 'fingerprint',
    loadChildren: () => import('./modules/fingerprint/fingerprint.module').then(mod => mod.FingerprintModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
