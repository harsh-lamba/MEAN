import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostList implements OnInit, OnDestroy {
  private _subscription: Subscription;
  public isLoader: boolean;
  constructor(private postService: PostService){
    this.posts = [];
  }

  public posts: Post[]

  public ngOnInit(){
    this.isLoader = true;
    //TODO: Create async object
    this.postService.getPosts();

    this._subscription = this.postService.postCreated
    .subscribe(()=>{
      this.isLoader = false;
      this.posts = this.postService.posts
    })
  }

  public deletePost(id: string){
    this.postService.deletePost(id);
  }

  public ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
