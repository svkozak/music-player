import { Attributes, Relationships } from './album.model';


export interface Activity {
  id: string;
  type?: string;
  href?: string;
  attributes?: Attributes;
  relationships?: Relationships
}