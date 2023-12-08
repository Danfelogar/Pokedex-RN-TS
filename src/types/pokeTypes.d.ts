export interface IPokemonRes {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface ISinglePokemon {
  name: string;
  url: string;
  id: string;
}
