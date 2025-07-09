import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route: string;
  subItems: { label: string; route: string }[];
  badge?: number;
  expanded?: boolean; 
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { 
      key: 'vehicules', 
      label: 'Véhicules', 
      icon: 'directions_car',
      route: '/vehicules',
      subItems: [],
      expanded: false
    },
    { 
      key: 'entretiens', 
      label: 'Entretiens', 
      icon: 'build',
      route: '/entretiens',
      subItems: [
      ],
      expanded: false
    },
    { 
      key: 'assurances', 
      label: 'Assurances', 
      icon: 'verified_user',
      route: '/assurances',
      subItems: [],
      expanded: false
    },
    { 
      key: 'controles-techniques', 
      label: 'Contrôles Techniques', 
      icon: 'car_repair',
      route: '/controle-technique',
      subItems: [],
      expanded: false
    },
    { 
      key: 'alertes', 
      label: 'Alertes', 
      icon: 'notifications',
      route: '/alertes',
      badge: 0,
      subItems: [],
      expanded: false
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleSubMenu(event: Event, item: MenuItem): void {
    event.stopPropagation();
    if (item.subItems && item.subItems.length > 0) {
      item.expanded = !item.expanded;
    } else {
      this.navigateTo(item.route);
    }
  }
}