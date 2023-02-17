import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Movie, WholeData } from 'src/app/interfaces/movies.model';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrls: ['./first-task.component.scss'],
})
export class FirstTaskComponent {
  constructor(
    private moviesApiService: MoviesApiService,
    private movieDataService: MovieDataService
  ) {}

  movieTitle = new FormControl();

  // movie$: Observable<any> | undefined;
  // countries$: Observable<any> | undefined;

  wholeData$: Observable<any> | undefined;

  ngOnInit() {
    // this.moviesApiService
    //   .getCountry('georgia')
    //   .pipe(
    //     map((country) => {
    //       return {
    //         // currencies: Object.keys(country.currencies),
    //         currencies: country.currencies,
    //         population: country.population,
    //         flags: country.flags.png,
    //       };
    //     })
    //   )
    //   .subscribe((x) => console.log(x));
  }

  getMovieInfo() {
    this.wholeData$ = this.moviesApiService
      .getMovie(this.movieTitle.value)
      .pipe(
        switchMap((movie) => {
          const movieObj = {
            title: movie.Title,
            actors: movie.Actors.split(', ')
              .map((fullName) => fullName.split(' ')[0])
              .join(', '),
            country: movie.Country,
            // year: movie.Year,
            yearsAgo: new Date().getFullYear() - +movie.Year,
            poster: movie.Poster,
            genre: movie.Genre,
            awards: movie.Awards,
            runtime: movie.Runtime,
            id: movie.imdbID,
            released: movie.Released,
          };

          const countries = movie.Country.split(', ').map((country) =>
            this.fetchCountryInfo(country)
          );
          // return forkJoin([ of(movieObj), ...countries]);
          return forkJoin([...countries]).pipe(
            map((countriesInfo) => ({ countriesInfo, movieInfo: movieObj }))
          );
        })
      );
    // .subscribe(console.log);
  }

  // private fetchFlagsAndCurrencies(country: string)
  private fetchCountryInfo(country: string) {
    return this.moviesApiService.getCountry(country).pipe(
      map(({ flags, currencies, population }) => ({
        flags,
        currencies,
        population,
      }))
    );
  }

  getCurrenciesPropertyName(data: any): string {
    return Object.keys(data.currencies)[0];
  }

  addToList(data: WholeData) {
    this.movieDataService.movieData = data;
    // this.movieDataService.movieData$ = of(data);
    // this.moviesApiService.saveMovie(data).subscribe((x) => console.log(x));
    // console.log(movie);
  }
}

//16 Feb - ძველი
// getMovieInfo() {
//   this.api
//     .getMovie(this.movieTitle.value)
//     .pipe(
//       switchMap((movie) => {
//         // const title = movie.Title;
//         const movieObj = {
//           title: movie.Title,
//           actors: movie.Actors.split(", ").map((fullName) => fullName.split(" ")[0]).join(", "),
//           country: movie.Country,
//           year: movie.Year,
//           yearsAgo: new Date().getFullYear() - +movie.Year,
//           poster: movie.Poster
//         }

//         const countries = movie.Country.split(', ').map((country) =>
//           this.fetchFlagsAndCurrencies(country)
//         );
//         // return forkJoin([ of(movieObj), ...countries]);
//         this.movie$ = of(movieObj);
//         this.countries$ = forkJoin([...countries]);
//         return  forkJoin([...countries]);
//       })
//     )
//     .subscribe(console.log);
// }

