import { ReactNode } from "react";

export enum Genres {
  All = 'All',
  Documentary = 'Documentary',
  Comedy = 'Comedy',
  Horror = 'Horror',
  Crime = 'Crime',
}

export interface IMovie {
  poster_path?: string;
  title: string;
  release_date: string;
  // genres: Exclude<Genres, Genres.All>[];
  // genres: ('Documentary' | 'Comedy' | 'Horror' | 'Crime')[];
  genres: string[] | Exclude<Genres, Genres.All>[];
  id?: string;
}

export interface IMovieDetails extends IMovie {
  vote_average?: string;
  duration?: string;
  description?: string;
}

export interface IOption {
  value: string;
  name: string;
}