import { Attributes, Relationships } from './album.model';


export interface Recommendation {
  id: string;
  type?: string;
  href?: string;
  attributes?: Attributes,
  relationships?: Relationships
}
