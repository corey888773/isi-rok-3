import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    let posts = this.http.get<any[]>(`${this.baseUrl}/posts`);
    console.log(posts);
    return posts;
  }

  getPhotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/photos`);
  }

  getPhoto(photoId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/photos/${photoId}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts`, post);
  }
}