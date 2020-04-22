import { ICoordinate } from './ICoordinate';

export interface IPlace {
  id: number;
  name: string;
  type: string;
  modifier: string;
  address: string;
  coordinate: ICoordinate
}
