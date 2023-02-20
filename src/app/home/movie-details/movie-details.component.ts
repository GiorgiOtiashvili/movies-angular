import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoriteMovie } from 'src/app/interfaces/movies.model';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieApiService: MoviesApiService,
    private movieDataService: MovieDataService,
    private router: Router
  ) {}

  favoriteMovies$: Observable<FavoriteMovie[]> = this.movieApiService.getFavoriteMovies();
  selectedMovie: FavoriteMovie | undefined;

  isEditing: boolean = false;

  @ViewChild('input') input: ElementRef | undefined;

  ngOnInit() {
    const favoriteMovieId = this.activatedRoute.snapshot.params['movieId'];
    // console.log(typeof favoriteMovieId, favoriteMovieId);

    this.favoriteMovies$.subscribe((movies) => {
      this.selectedMovie = movies.find((movie) => movie.id === Number(favoriteMovieId));
      console.log(this.selectedMovie);
    });

    // if (favoriteMovieId) {
    //   this.favoriteMovies$.subscribe({
    //     next: (movies) =>
    //       (this.selectedMovie = movies.find(
    //         (movie) => movie.id === Number(favoriteMovieId)
    //       )),
    //     complete: () => console.log(this.selectedMovie),
    //   });
    // }

    // if (favoriteMovieId) {
    //   const bla = this.favoriteMovies$.pipe(map((movies) => movies.find((movie) => movie.id === favoriteMovieId))).subscribe(res => this.selectedMovie = res)
    // }

    console.log(this.selectedMovie?.comment);

  }

  getCurrenciesPropertyName(data: any): string {
    return Object.keys(data.currencies)[0];
  }

  deleteMovie(id: number) {
    this.movieApiService.deleteMovie(id).subscribe(() => {
      this.router.navigateByUrl('/favorites');
    });
    // this.selectedMovie = this.movieDataService.selectedMovie;
  }

  deleteMovieComment(id: number) {
    this.movieApiService.deleteMovie(id).subscribe((x) => {
      console.log(x);
    });
  }

  // Edit
  enterEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  edit(movie: FavoriteMovie) {
    console.log(this.input?.nativeElement.value);
    const commentValue = this.input?.nativeElement.value;

    movie.comment = commentValue;

    this.movieApiService.editComment(movie.id, movie).subscribe(() => {
      console.log;
      this.cancelEdit();
    })

    // this.movieApiService.editComment(movie.id, {
    //     ...movie,
    //     comment: commentValue,
    //   })
    //   .subscribe(() => {
    //     console.log;
    //     this.cancelEdit();
    //     // this.favoriteMovies$ = this.movieApiService.getFavoriteMovies();
    //     // this.selectedMovie = movies.find((movie) => movie.id === Number(favoriteMovieId))
    //   });
  }
}
