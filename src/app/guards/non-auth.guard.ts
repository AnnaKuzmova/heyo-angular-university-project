import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.authService.getLoggedUser()) return true;
    this.router.navigate(['/dashboard']);
    return false;
  }
}
