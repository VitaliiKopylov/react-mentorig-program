import { ReactNode } from "react";

export enum Genres {
  All = 'All',
  Documentary = 'Documentary',
  Comedy = 'Comedy',
  Horror = 'Horror',
  Crime = 'Crime',
}

export enum SortOptions {
  ReleaseDate = 'Release Date',
  Title = 'Title',
}

export interface IMovie {
  imageUrl?: string;
  name: string;
  releaseYear: number | string;
  // genres: Exclude<Genres, Genres.All>[];
  // genres: ('Documentary' | 'Comedy' | 'Horror' | 'Crime')[];
  genres: string[] | Exclude<Genres, Genres.All>[];
}

export interface IMovieDetails extends IMovie {
  rating?: number | string;
  duration?: string;
  description?: string;
}