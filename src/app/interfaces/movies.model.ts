export interface Movie {
  Title: string;
  Year: string;
  Actors: string;
  Runtime: string;
  Country: string;
}

export interface Country {
  currencies: Currency;
  population:  number;
  flags: Flags;
}

interface Currency {
  [key: string]: {
      name: string;
      symbol: string;
  }
}

interface Flags {
  png: string;
}

export interface MovieInfo {
  duration: number;
  countryNamesArr: string[]
}
