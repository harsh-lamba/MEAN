import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Post } from './post.interface';

@Injectable({providedIn: 'root'})
export class PostService{
  private _posts: Post[]
  private _postCreated: Subject<void>;
  constructor(){
    this._posts = [];
    this._postCreated = new Subject<void>();
  }

  public get posts():  Post[]{
    return [...this._posts]
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
