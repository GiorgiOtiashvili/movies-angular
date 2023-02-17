import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.component.html',
  styleUrls: ['./second-task.component.scss'],
})
export class SecondTaskComponent {
  constructor(private moviesApiService: MoviesApiService) {}

  movieTitle1 = new FormControl();
  movieTitle2 = new FormControl();
  movieTitle3 = new FormControl();

  data$: Observable<any> | undefined;

  combinedLength: number = 0;
  combinedPopulation: number = 0;

  getMoviesInfo() {
    const movie1 = this.moviesApiService.getMovie(this.movieTitle1.value);
    const movie2 = this.moviesApiService.getMovie(this.movieTitle2.value);
    const movie3 = this.moviesApiService.getMovie(this.movieTitle3.value);

    forkJoin([movie1, movie2, movie3])
      .pipe(
        map((res) =>
          res.map((movie) => {
            return {
              duration: Number(movie.Runtime.split(' ')[0]),
              countryNamesArr: movie.Country.split(', '),
            };
          })
        ),
        switchMap((arr) => {
          arr.forEach((obj) => (this.combinedLength += obj.duration));
          // this.combinedLength = x.duration.reduce((acc, curr) => acc + curr);
          return of('bla');
        })

        // map((responses) => {
        //   const lengths = responses.map((r) => Number(r.Runtime));
        //   this.combinedLength = lengths.reduce((a, b) => a + b);
        //   const countries = responses.map((r) => r.Country);
        //   const uniqueCountries = [...new Set(countries)];
        //   return uniqueCountries;
        // }),
        // map((countries) =>
        //   forkJoin(
        //     countries.map((c) =>
        //       this.moviesApiService.getCountry(c)
        //     )
        //   )
        // ),
        // map((responses) => {
        //   const populations = responses
        //     .map((r) => r[0].population)
        //     .filter((p) => p !== undefined);
        //   this.combinedPopulation = populations.reduce((a, b) => a + b);
        // })
      )
      .subscribe();
  }
}
