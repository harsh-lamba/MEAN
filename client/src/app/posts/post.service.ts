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

  public addPost(title: string, description: string) {
    const post = <Post>{
      id: null,
      title: title,
      description: description,
    };

    this.http
      .post<{message: string, postId: string}>('http://localhost:4000/api/post', {
        post: post,
      })
      .subscribe((res) => {
        const id = res.postId;
        post.id = id;
        this._posts.push(post);
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
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        console.log(transformedPost);
        this._posts = transformedPost;
        this._postCreated.next();
      });
  }

  public deletePost(id: string): void {
    this.http.delete(`http://localhost:4000/api/posts/${id}`).subscribe((response)=>{
      console.log(response);
      const updatedPost = this._posts.filter(post => post.id !== id);
      this._posts = updatedPost;
      this._postCreated.next();
    })
  }
}
