import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.interface';

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts: Post[];
  private _postCreated: Subject<void>;
  constructor(private http: HttpClient) {
    this._posts = [];
    this._postCreated = new Subject<void>();
  }

  public get posts(): Post[] {
    return [...this._posts];
  }

  public get postCreated(): Observable<void> {
    return this._postCreated.asObservable();
  }

  public addPost(title: string, description: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", description);
    postData.append("image", image, title);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:4000/api/posts',
        postData
      )
      .subscribe((res) => {
        this._posts.push({
          id: res.post.id,
          title: title,
          description: description,
          imagePath: res.post.imagePath
        });
        this._postCreated.next();
      });
  }

  public getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:4000/api/posts')
      .pipe(
        map((result) => {
          return result.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              description: post.description,
              imagePath: post.imagePath,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this._posts = transformedPost;
        this._postCreated.next();
      });
  }

  public getPost(id: string) {
    return this.http
      .get<{
        post: {
          _id: string;
          title: string;
          description: string;
          imagePath: string;
        };
      }>(`http://localhost:4000/api/posts/${id}`)
      .pipe(
        map((result) => {
          return <Post>{
            id: result.post._id,
            title: result.post.title,
            description: result.post.description,
            imagePath: result.post.imagePath,
          };
        })
      );
  }

  public updatePost(id: string, title: string, description: string) {
    const post: Post = { id, title, description, imagePath:null };
    this.http
      .put(`http://localhost:4000/api/posts/${id}`, post)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public deletePost(id: string): void {
    this.http
      .delete(`http://localhost:4000/api/posts/${id}`)
      .subscribe((response) => {
        console.log(response);
        const updatedPost = this._posts.filter((post) => post.id !== id);
        this._posts = updatedPost;
        this._postCreated.next();
      });
  }
}
