import { Component } from '@angular/core';
import { Post } from './posts/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    this.createdPost = [];
  }

  public readonly createdPost: Post[]

  public updatePost(post: Post){
    this.createdPost.push(post);
  }

}
