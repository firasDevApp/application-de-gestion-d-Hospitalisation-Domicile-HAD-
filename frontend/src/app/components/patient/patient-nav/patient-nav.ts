import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  active: boolean;
  badge?: number;
}

@Component({
  selector: 'app-patient-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-nav.html',
  styleUrls: ['./patient-nav.css']
})
export class PatientNav {

  navItems: NavItem[] = [
    { path: '/patient/home', label: 'Tableau de bord', icon: 'fa-home', active: false },
    { path: '/patient/dossier', label: 'Dossier médical', icon: 'fa-file-medical', active: false },
    { path: '/patient/visites', label: 'Visites', icon: 'fa-calendar-check', active: false },
    { path: '/patient/about-us', label: 'A propos de nous', icon: 'fa-info-circle', active: false },
    { path: '/patient/contact', label: 'Contact', icon: 'mdi mdi-email', active: false },
  ];

  isMobileMenuOpen = false;
  isMobileView = false;

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.checkViewport();
    }

    // Synchronisation automatique sur changement de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveByUrl();
      });
  }

  ngOnInit() {
    this.updateActiveByUrl(); // Init correct si reload page
  }

  updateActiveByUrl() {
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      item.active = currentUrl.startsWith(item.path);
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.checkViewport();
    }
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  setActive(item: NavItem) {
    this.navItems.forEach(nav => nav.active = false);
    item.active = true;

    if (this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  goToDashboard() {
    this.router.navigate(['/patient/home']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
