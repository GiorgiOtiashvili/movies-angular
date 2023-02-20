import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FavoriteMovie } from 'src/app/interfaces/movies.model';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent {
  constructor(
    private moviesApiService: MoviesApiService,
    private movieDataService: MovieDataService
  ) {}

  // | undefined | null | any[]
  favoriteMovies$: Observable<FavoriteMovie[]> = this.moviesApiService.getFavoriteMovies();

  ngOnInit() {
    // this.favoriteMovies$ =  this.moviesApiService.getFavoriteMovies();
    // console.log(this.favoriteMovies$);
    // this.favoriteMovies$?.subscribe(console.log);
  }

  viewDetails(movie: FavoriteMovie) {
    this.movieDataService.selectedMovie = movie;
    this.movieDataService.selectedMovie$ = of(movie);
    // console.log(movie);
  }
}
