import { SerializedError } from '@reduxjs/toolkit';

export interface IApiFactory {
  getMapLoading: boolean;
  getMapDone: boolean;
  getMapError: SerializedError | null;
  setMusicLoading: boolean;
  setMusicDone: boolean;
  setMusicError: SerializedError | null;
  setMapLoading: boolean;
  setMapDone: boolean;
  setMapError: SerializedError | null;
}

export interface IGetMap {
  mapId: string;
  spaceId: string;
  apiKey: string;
  x?: number;
  y?: number;
  loop?: boolean;
  maxDistance?: number;
  volume?: number;
  id?: string;
  musicState?: boolean;
  src?: string;
}

export interface ISetMap {
  mapId: string;
  spaceId: string;
  apiKey: string;
  mapContent: any;
}

export interface IMusicObj {
  x: number;
  y: number;
  sound: {
    loop: boolean;
    maxDistance: number;
    volume: number;
    src: string;
  };
}

export interface IloadMusicValue {
  x: number;
  y: number;
  loop: boolean;
  maxDistance: number;
  volume: number;
  src: string;
}
