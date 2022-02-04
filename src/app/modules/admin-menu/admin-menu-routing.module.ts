import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceMatchComponent } from './face-match/face-match.component';
import { EnrollComponent } from './enroll/enroll.component';
import { MenuComponent } from './menu/menu.component';
import { FaceValidationComponent } from './face-validation/face-validation.component';
import { ReportFgaComponent } from './report-fga/report-fga.component';
 

const routes: Routes = [
  {
    path: 'enroll',
    component: EnrollComponent,
  },
  {
    path: 'admin-menu',
    component: MenuComponent,
  },
  {
    path: 'daily-face',
    component: FaceMatchComponent,
  },
  {
    path: 'daily-face-validator',
    component: FaceValidationComponent,
  },
  {
    path: 'report-fga',
    component: ReportFgaComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMenuRoutingModule { }
