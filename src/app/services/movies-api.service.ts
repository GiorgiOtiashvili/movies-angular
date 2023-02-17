import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, FavoriteMovie, Movie } from '../interfaces/movies.model';

// ed7137e4
// fe67fddd - dzveli
const Movie_API_BASE = `https://www.omdbapi.com/?apikey=ed7137e4`;
const COUNTRY_API_BASE = `https://restcountries.com/v3.1/`;
const JSON_SERVER_BASE = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}

  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`${Movie_API_BASE}&t=${title}`);
  }

  getCountry(country: string): Observable<Country> {
    return this.http
      .get<Country[]>(`${COUNTRY_API_BASE}name/${country}?fullText=true`)
      .pipe(map((arr) => arr[0]));
  }

  // json-server
  getFavoriteMovies() {
    return this.http.get<FavoriteMovie[]>(`${JSON_SERVER_BASE}/movies`);
  }

  // : Observable<any>
  saveMovie(movie: any) {
    return this.http.post<FavoriteMovie>(`${JSON_SERVER_BASE}/movies`, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${JSON_SERVER_BASE}/movies/${id}`);
  }

  // deleteMovieComment(id: number) {
  //   return this.http.delete(`${JSON_SERVER_BASE}/movies/${id}`);
  // }
}

// export function getMovie(name: string): Promise<Movie> {
// 	return fetch(`https://www.omdbapi.com/?t=${name}&apikey=fe67fddd`)
//     .then((x) => x.json());
// }

// export function getCountry(country: string): Promise<Country> {
// 	return fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
//     .then((x) => x.json())
//     .then((x) => x[0]);
// }
