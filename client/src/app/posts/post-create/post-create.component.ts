import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreate{
  constructor(private postService: PostService){
  }

  public addPost(postForm: NgForm){
    if (postForm.invalid) return;

    this.postService.addPost(postForm.value.title, postForm.value.description);
  }

}
