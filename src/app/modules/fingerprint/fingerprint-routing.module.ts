import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FingerprintMatchComponent} from './fingerprint-match/fingerprint-match.component';
import {MatchComponent} from './match/match.component';

const routes: Routes = [
  {
    path: '',
    component: FingerprintMatchComponent,
  },
  {
    path: 'detector',
    component: MatchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FingerprintRoutingModule { }
