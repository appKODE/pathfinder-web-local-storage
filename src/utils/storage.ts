import { DataStorage } from '@kode-frontend/pathfinder-web-core';
import { getItem, setItem } from './local-storage';



export const storage: DataStorage = {
  getItem, setItem,
};
