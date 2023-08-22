export function getAllCharacters(): Promise<AllCharacters> {
  return fetch(`https://rickandmortyapi.com/api/character`).then((res) =>
    res.json()
  );
}

export function getCharacter(id: number): Promise<Character> {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
    res.json()
  );
}

export type AllCharacters = {
  info: Info;
  results: Character[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: any;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Origin = {
  name: string;
  url: string;
};

export type Location = {
  name: string;
  url: string;
};
