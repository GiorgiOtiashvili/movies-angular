import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstTaskComponent } from './home/first-task/first-task.component';
import { HomeComponent } from './home/home.component';
import { SecondTaskComponent } from './home/second-task/second-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'first',
    component: FirstTaskComponent
  },
  {
    path: 'second',
    component: SecondTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
