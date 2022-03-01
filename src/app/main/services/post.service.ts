import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = `${environment.apiUrl}/posts`;
  constructor(private http: HttpClient) {}

  getAllGroupPosts$(groupId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?groupId=${groupId}` );
  }

  getPost$(id:number):Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`);
  }

  createPost$(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.postUrl}`, post)
  }

  deletePost$(id:number):Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}`);
  }
}
