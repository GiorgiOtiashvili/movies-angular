import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { Movie } from 'src/app/interfaces/movies.model';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrls: ['./first-task.component.scss'],
})
export class FirstTaskComponent {
  constructor(private api: MoviesApiService) {}

  movieTitle = new FormControl();

  movie$: Observable<any> | undefined;
  country$: Observable<any> | undefined;

  ngOnInit() {
    this.api
      .getCountry('georgia')
      .pipe(
        map((country) => {
          return {
            // currencies: Object.keys(country.currencies),
            currencies: country.currencies,
            population: country.population,
            flags: country.flags.png,
          };
        })
      )
      .subscribe((x) => console.log(x));
  }

  getMovieInfo() {
    // console.log(this.movieTitle.value);

    return (this.movie$ = this.api.getMovie(this.movieTitle.value).pipe(
      // map((movie) => {
      //   return {
      //     ...movie,
      //     Country: movie.Country.split(', '),
      //     Year: Number(movie.Year),
      //     Actors: movie.Actors.split(', ')
      //       .map((fullName) => fullName.split(' ')[0])
      //       .join(', '),
      //   };
      // }),
      map((movie) =>
        from(movie.Country.split(', ')).pipe(
          switchMap((nam) =>
            this.api.getCountry(nam).pipe(tap((x) => console.log(x)))
          )
        )
      )
    ));
  }
}

// return this.movie$ = forkJoin([this.api.getMovie(this.movieTitle.value).pipe(
//   map((movie) => {
//     return {
//       ...movie,
//       Year: Number(movie.Year),
//       Actors: movie.Actors.split(", ").map((fullName) => fullName.split(" ")[0]).join(", "),
//     };
//   })), this.api.getMovie(this.movieTitle.value).pipe(switchMap((movie) => this.api.getCountry(movie.Country)))])
