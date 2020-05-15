import { Component, Input } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostList {
  @Input()
  public posts: Post[];

}
