import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { FinalInfo } from 'src/app/interfaces/movies.model';
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

  moviesData$: Observable<FinalInfo> | undefined;

  getMoviesInfo() {
    const movie1 = this.moviesApiService.getMovie(this.movieTitle1.value);
    const movie2 = this.moviesApiService.getMovie(this.movieTitle2.value);
    const movie3 = this.moviesApiService.getMovie(this.movieTitle3.value);

    this.moviesData$ = forkJoin([movie1, movie2, movie3]).pipe(
      // tap(console.log),
      map((result) =>
        result.map((movie) => {
          return {
            duration: Number(movie.Runtime.split(' ')[0]),
            countryNamesArr: movie.Country.split(', '),
          };
        })
      ),
      switchMap((arr) => {
        // console.log(arr);
        const countryNames = [
          ...new Set(arr.map((item) => item.countryNamesArr).flat()),
        ];
        console.log(countryNames);

        return forkJoin(
          countryNames.map((country) =>
            this.moviesApiService.getCountry(country)
          )
        ).pipe(
          map((res) => {
            return {
              totalPopulation: res.reduce(
                (acc, curr) => acc + curr.population,
                0
              ),
              totalRuntime: Number(
                arr.reduce((acc: any, curr: any) => acc + curr.duration, 0)
              ),
            };
          })
        );
      })
    );
  }
}
