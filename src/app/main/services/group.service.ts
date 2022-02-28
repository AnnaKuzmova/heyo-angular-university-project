import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupModel } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupApiUrl = `${environment.apiUrl}/groups`;
  constructor(private http: HttpClient) {}

  getLoggedUserGroup$(userId: number): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(`${this.groupApiUrl}?admin=${userId}`);
  }

  createGroup$(group: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(this.groupApiUrl, group);
  }

  deleteGroup$(id: number): Observable<any> {
    return this.http.delete(`${this.groupApiUrl}/${id}`);
  }
}
