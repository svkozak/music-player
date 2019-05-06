import { Artist } from './artist.model';
import { Track } from './track.model';

export interface Album {
  attributes?: Attributes;
  href?: string;
  id: string;
  type?: string;
  relationships?: any;
}

export interface Attributes {
  artistName: string;
  name: string;
  artwork: Artwork;
  contentRating: string;
  copyright: string;
  isComplete: boolean;
  isMasteredForItunes: boolean;
  isSingle: boolean;
  recordLabel: string;
  releaseDate: string;
  trackCount: number;
  url: string;
  editorialNotes: EditorialNotes;
  genreNames: string[];
  playParams: PlayParams;
}

export interface Artwork {
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string;
  width: number;
  height: number;
}

export interface EditorialNotes {
  short: string;
  standard?: string;
}

export interface PlayParams {
  id: string;
  kind: string;
}
