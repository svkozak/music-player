import { Attributes, Relationships } from './album.model';
export interface Genre {
  id?: string;
  href?: string;
  attributes?: Attributes,
  type?: string;
  relationships?: Relationships
}