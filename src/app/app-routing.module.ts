import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'candidates',
    component: CandidatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
