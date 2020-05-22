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
          console.log(result);
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

  public updatePost(id: string, title: string, description: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("description", description);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        description: description,
        imagePath: image
      };
    }

    this.http
      .put(`http://localhost:4000/api/posts/${id}`, postData)
      .subscribe((response) => {
        const updatedPosts = [...this._posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id: id,
          title: title,
          description: description,
          imagePath: ""
        };
        updatedPosts[oldPostIndex] = post;
        this._posts = updatedPosts;
        this._postCreated.next();
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
