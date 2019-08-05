import { Attributes } from './album.model';
export interface Playlist {
  id: string;
  type?: string;
  href?: string;
  attributes?: Attributes;
  relationships?: any;
}