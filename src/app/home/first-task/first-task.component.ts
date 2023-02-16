import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  concatMap,
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
  countries$: Observable<any> | undefined;

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
    this.api
      .getMovie(this.movieTitle.value)
      .pipe(
        switchMap((movie) => {
          // const title = movie.Title;
          const movieObj = {
            title: movie.Title,
            actors: movie.Actors.split(", ").map((fullName) => fullName.split(" ")[0]).join(", "),
            country: movie.Country,
            year: movie.Year,
            yearsAgo: new Date().getFullYear() - +movie.Year,
            poster: movie.Poster
          }

          const countries = movie.Country.split(', ').map((country) =>
            this.fetchFlagsAndCurrencies(country)
          );
          // return forkJoin([ of(movieObj), ...countries]);
          this.movie$ = of(movieObj);
          this.countries$ = forkJoin([...countries]);
          return  forkJoin([...countries]);
        })
      )
      .subscribe(console.log);
  }

  private fetchFlagsAndCurrencies(country: string) {
    return this.api
      .getCountry(country)
      .pipe(map(({ flags, currencies }) => ({ flags, currencies })));
  }

  getCurrenciesPropertyName(data: any): string {
    return Object.keys(data.currencies)[0];
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

// console.log(this.movieTitle.value);

//  return (this.movie$ = this.api.getMovie(this.movieTitle.value).pipe(
//   // map((movie) => {
//   //   return {
//   //     ...movie,
//   //     Country: movie.Country.split(', '),
//   //     Year: Number(movie.Year),
//   //     Actors: movie.Actors.split(', ')
//   //       .map((fullName) => fullName.split(' ')[0])
//   //       .join(', '),
//   //   };
//   // }),
//   map((movie) =>
//     from(movie.Country.split(', ')).pipe(
//       switchMap((nam) =>
//         this.api.getCountry(nam).pipe(tap((x) => console.log(x)))
//       )
//     )
//   )
// ));
