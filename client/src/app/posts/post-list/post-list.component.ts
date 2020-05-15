import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostList implements OnInit, OnDestroy {
  private _subscription: Subscription;
  constructor(private postService: PostService){
    this.posts = [];
  }

  public posts: Post[]

  public ngOnInit(){
    //TODO: Create async object
    this.postService.getPosts();

    this._subscription = this.postService.postCreated.subscribe(()=>{
      this.updatePosts();
    })
  }

  private updatePosts(){
    this.posts = this.postService.posts
  }

  public ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
