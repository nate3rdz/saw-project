import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (e: any) {
      throw new ErrorEvent(e.toString());
    }
  }

  getItem(key: string): any {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e: any) {
        throw new ErrorEvent(e.toString());
      }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e: any) {
        throw new ErrorEvent(e.toString());
      }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e: any) {
        throw new ErrorEvent(e.toString());
      }
  }
}