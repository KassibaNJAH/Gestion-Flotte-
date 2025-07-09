// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('light');
  currentTheme = this.currentThemeSubject.asObservable();

  constructor() {
    // Vérifiez le thème sauvegardé dans localStorage au démarrage
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    // Sauvegardez le thème dans localStorage
    localStorage.setItem('theme', theme);
    
    // Appliquez le thème au document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Émettez le nouveau thème
    this.currentThemeSubject.next(theme);
  }
}