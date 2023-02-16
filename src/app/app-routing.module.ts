import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './home/add-movie/add-movie.component';
import { FirstTaskComponent } from './home/first-task/first-task.component';
import { HomeComponent } from './home/home.component';
import { SecondTaskComponent } from './home/second-task/second-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'first',
    component: FirstTaskComponent,
  },
  {
    path: 'second',
    component: SecondTaskComponent,
  },
  {
    path: 'addMovie',
    component: AddMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
