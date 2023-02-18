import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './home/add-movie/add-movie.component';
import { FavoriteMoviesComponent } from './home/favorite-movies/favorite-movies.component';
import { FirstTaskComponent } from './home/first-task/first-task.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';
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
  {
    path: 'favorites',
    component: FavoriteMoviesComponent,
  },
  {
    path: 'favorites/:movieId',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// path: ':movieId',
// path: 'details',
