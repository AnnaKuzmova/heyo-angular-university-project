import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../auth-module/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  setUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLoggedUser(): User | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  login$(email: string, password: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users: User[]) =>
        users.find((user) => user.password === password && user.email === email)
      ),
      catchError((error) => throwError(() => error))
    );
  }

  register$(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl, user)
      .pipe(catchError((error) => throwError(() => error)));
  }

  updateUser$(email: string, username: string, id: number): Observable<User> {
    return this.http.patch<User>(`${this.userUrl}/${id}`, { email, username });
  }

  getUserData$(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
}
