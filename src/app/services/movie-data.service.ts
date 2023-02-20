import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FavoriteMovie, WholeData } from '../interfaces/movies.model';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  constructor() {}

  // movieData$: Observable<WholeData> | undefined;
  movieData: WholeData | undefined;

  selectedMovie: FavoriteMovie | undefined;
  selectedMovie$: Observable<FavoriteMovie> | undefined;
}
