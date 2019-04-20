import { Artwork, PlayParams } from './album.model';

export interface Track {
  attributes: TrackAttributes;
  href: string;
  id: string;
  type: string;
  relationships?: any;
}

export interface TrackAttributes {
  previews: string[];
  artwork: Artwork;
  artistName: string;
  url: string;
  discNumber: number;
  genreNames: string[];
  durationInMillis: number;
  releaseDate: string;
  name: string;
  isrc: string;
  albumName: string;
  playParams: PlayParams;
  trackNumber: number;
  composerName: string;
  contentRating: string;
}