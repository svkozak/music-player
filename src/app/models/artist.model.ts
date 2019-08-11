import { Attributes, Relationships } from './album.model';
export interface Artist {
  id: string;
  href?: string;
  attributes?: Attributes,
  type?: string;
  relationships?: Relationships;
}