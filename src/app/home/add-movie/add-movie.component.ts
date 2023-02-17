import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    private movieApiService: MoviesApiService
  ) {}

  movieData: WholeData | undefined;
  // = this.movieDataService.movieData$
  // movieData$: Observable<WholeData> | undefined;


  commentText = new FormControl();

  ngOnInit(): void {
    this.movieData = this.movieDataService.movieData;
    // this.movieData$?.subscribe((x) => console.log(x));
    console.log(this.movieData);
    this.commentText.valueChanges.subscribe(console.log);
  }

  addToFavorites() {
    if(this.movieData) {}
    const favoriteMovie = {
      ...this.movieData,
      comment: this.commentText.value,
    }
    this.movieApiService.saveMovie(favoriteMovie).subscribe(x => console.log(x));
    // this.commentText.value = '';
    console.log("added a movie");
  }
}
