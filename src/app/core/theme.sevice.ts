import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  private _darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkTheme = this._darkTheme.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Initialize with stored theme or default to light
    const storedTheme = localStorage.getItem('darkTheme');
    const isDark = storedTheme === 'true';
    this.setDarkTheme(isDark);
  }

  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
    
    // Apply theme to document body
    if (isDarkTheme) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
    
    // Store theme preference
    localStorage.setItem('darkTheme', isDarkTheme.toString());
  }

  getCurrentTheme(): boolean {
    return this._darkTheme.value;
  }
}
