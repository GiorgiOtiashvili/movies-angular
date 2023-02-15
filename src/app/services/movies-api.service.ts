import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, Movie } from '../interfaces/movies.model';

const API_BASE = `https://www.omdbapi.com/?apikey=fe67fddd`;
const API_BASE_COUNTRY = `https://restcountries.com/v3.1/`;

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}

  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(`${API_BASE}&t=${title}`);
  }

  getCountry(country: string): Observable<Country> {
    return this.http.get<Country[]>(`${API_BASE_COUNTRY}name/${country}?fullText=true`).pipe(map((arr) => arr[0]));
  }
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
