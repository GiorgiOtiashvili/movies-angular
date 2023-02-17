import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FavoriteMovie } from 'src/app/interfaces/movies.model';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie: FavoriteMovie | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieApiService: MoviesApiService,
    private movieDataService: MovieDataService
  ) {}

  selectedMovie$: Observable<FavoriteMovie | undefined> | undefined;
  selectedMovie: FavoriteMovie | undefined;

  isEditing: boolean = false;

  ngOnInit() {
    const favoriteMovieId = this.activatedRoute.snapshot.params['movieId'];
    // console.log(favoriteMovieId);

    if (favoriteMovieId) {
      this.selectedMovie$ = this.movieApiService
        .getFavoriteMovies()
        .pipe(
          map((movies) => movies.find((movie) => movie.id === favoriteMovieId))
        );
      // usersDetails.find((user) => user.id === userId);
    }
    // this.selectedMovie$?.subscribe(console.log);

    this.selectedMovie = this.movieDataService.selectedMovie;
    console.log(this.selectedMovie);
  }

  getCurrenciesPropertyName(data: any): string {
    return Object.keys(data.currencies)[0];
  }

  deleteMovie(id: number) {
    this.movieApiService.deleteMovie(id).subscribe((x) => {
      console.log(x);
    });

    // this.selectedMovie = this.movieDataService.selectedMovie;
  }

  deleteMovieComment(id: number) {
    this.movieApiService.deleteMovie(id).subscribe((x) => {
      console.log(x);
    });
  }

  edit() {
    this.isEditing = true;
  }
}
