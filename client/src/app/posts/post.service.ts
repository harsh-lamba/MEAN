import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Post } from './post.interface';

@Injectable({providedIn: 'root'})
export class PostService{
  private _posts: Post[]
  private _postCreated: Subject<void>;
  constructor(private http: HttpClient){
    this._posts = [];
    this._postCreated = new Subject<void>();
  }

  public get posts():  Post[]{
    return [...this._posts]
  }

  public getPosts(){
    this.http.get<{message:string, posts: Post[]}>('http://localhost:4000/api/posts')
      .subscribe((result) => {
        this._posts = result.posts;
        this._postCreated.next();
      })
  }

  public get postCreated(): Observable<void>{
    return this._postCreated.asObservable()
  }

  public addPost(title: string, description: string){
    this._posts.push(<Post>{
      title: title,
      description: description
    });
    this._postCreated.next();
  }
}
