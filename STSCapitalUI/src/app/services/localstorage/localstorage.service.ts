import { Injectable } from '@angular/core';
import { JSONX } from '../parser/jsonx';
import { localStorageKeys } from './localstorage-keys';


@Injectable()
export class LocalStorageService {

    getAllLocalStorage(): any {
        return localStorageKeys().map(e => {
            return JSONX.tryParse(localStorage.getItem(e));
        });
    }
    /**
     * Clear all localstorage value only
     */
    clearAllLocalStorageValue(): void {
        localStorageKeys().map(key => {
            localStorage.setItem(key, '');
        });
    }
    /** Clear localstorage value with specific key @param key */
    clearLocalStorageValue(key: string): void {
        localStorage.setItem(key, '');
    }
    /**
     * Clear full localstorage(both key and value)
     */
    clearAllLocalStorageKeyAndValue(): void {
        localStorage.clear();
    }
    /** Clear localstorage both key and value with specific key @param key */
    clearLocalStorageKeyAndValue(key: string): void {
        localStorage.removeItem(key);
    }

}
