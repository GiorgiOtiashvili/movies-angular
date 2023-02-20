import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { FavoriteMovie, WholeData } from 'src/app/interfaces/movies.model';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  constructor(
    private movieDataService: MovieDataService,
    private movieApiService: MoviesApiService,
    private router: Router
  ) {}

  movieData: WholeData | undefined;
  // = this.movieDataService.movieData$
  // movieData$: Observable<WholeData> | undefined;

  commentText = new FormControl();

  ngOnInit(): void {
    this.movieData = this.movieDataService.movieData;
    console.log(this.movieData);
    this.commentText.valueChanges.subscribe(console.log);
  }

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rating: number = 0;

  // myCommentAndRating = {
  //   comment: this.commentText.value,
  //   myRating: this.rating,
  // };

  addToFavorites() {
    // if(this.movieData) {}
    const favoriteMovie = {
      ...this.movieData,
      // ...this.myCommentAndRating,
      comment: this.commentText.value,
      myRating: this.rating,
    };

    console.log(favoriteMovie);

    this.movieApiService.saveMovie(favoriteMovie).subscribe({
      // next: (x) => console.log(x),
      complete: () => this.router.navigateByUrl('/favorites'),
    });

    // this.commentText.value = '';
  }
}
