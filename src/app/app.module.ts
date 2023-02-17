import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirstTaskComponent } from './home/first-task/first-task.component';
import { SecondTaskComponent } from './home/second-task/second-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteMoviesComponent } from './home/favorite-movies/favorite-movies.component';
import { AddMovieComponent } from './home/add-movie/add-movie.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstTaskComponent,
    SecondTaskComponent,
    FavoriteMoviesComponent,
    AddMovieComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
