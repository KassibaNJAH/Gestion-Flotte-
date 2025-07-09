import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestion Flotte Auto';
  isCollapsed = false;
  isDarkTheme = false;
  unreadAlerts = 0;
  currentRoute = '';
  searchTerm = '';
  
  // Menu items with icons and routes
  menuItems = [
    { 
      key: 'vehicules', 
      label: 'Véhicules', 
      icon: 'directions_car',
      route: '/vehicules',
      subItems: []
    },
    { 
      key: 'entretiens', 
      label: 'Entretiens', 
      icon: 'build',
      route: '/entretiens',
      subItems: []
       
    },
    { 
      key: 'assurances', 
      label: 'Assurances', 
      icon: 'verified_user',
      route: '/assurances',
      subItems: []
    },
    { 
      key: 'controles-techniques', 
      label: 'Contrôles Techniques', 
      icon: 'car_repair',
      route: '/controle-technique',
      subItems: []
    },
    { 
      key: 'alertes', 
      label: 'Alertes', 
      icon: 'notifications',
      route: '/alertes',
      badge: this.unreadAlerts,
      subItems: []
    }
  ];

  filteredMenuItems = [...this.menuItems];
  
  // User info
  userAvatar = 'assets/images/user-avatar.png';
  userName = 'Admin';
  userRole = 'Administrateur';

  constructor(private router: Router) {}

ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.currentRoute = event.url.split('/')[1];
    }
  });

  // Récupérer l'état du sidebar
  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState) {
    this.isCollapsed = savedState === 'true';
  }
  
  // Récupérer le thème
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme) {
    this.isDarkTheme = savedTheme === 'true';
    this.applyTheme();
  }
}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

private applyTheme(): void {
  if (this.isDarkTheme) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('darkTheme', 'true');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('darkTheme', 'false');
  }
}

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  filterMenu(): void {
    if (!this.searchTerm) {
      this.filteredMenuItems = [...this.menuItems];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredMenuItems = this.menuItems.filter(item => 
      item.key.toLowerCase().includes(term) || 
      item.label.toLowerCase().includes(term)
    );
  }
}