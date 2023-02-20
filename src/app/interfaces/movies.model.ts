export interface Movie {
  Title: string;
  Year: string;
  Actors: string;
  Runtime: string;
  Country: string;
  Poster: string;
  Awards: string;
  Genre: string;
  Released: string;
  imdbID: string;
}

export interface Country {
  currencies: Currency;
  population: number;
  flags: Flags;
}

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Flags {
  png: string;
  alt: string;
}

export interface MovieInfo {
  duration: number;
  countryNamesArr: string[];
}

// ახალი interface-ები
export interface ChangedMovie {
  title: string;
  actors: string;
  country: string;
  yearsAgo: number;
  poster: string;
  genre: string;
  awards: string;
  runtime: string;
  id: string;
  released: string;
}

export interface WholeData {
  countriesInfo: Country[];
  movieInfo: ChangedMovie;
}

export interface FavoriteMovie extends WholeData {
  comment: string;
  myRating?: number;
  id: number;
}

// Task 2
export interface FinalInfo {
  totalPopulation: number;
  totalRuntime: number;
}
