import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreate{
  constructor(){
    this.postCreated = new EventEmitter<Post>();
  }

  public title: string;

  public description: string;
  @Output()
  public readonly postCreated: EventEmitter<Post>;

  public addPost(postForm: NgForm){
    if (postForm.invalid) return;

    const post:Post = {
      title: postForm.value.title,
      description: postForm.value.description
    }

    this.postCreated.emit(post)
  }

}
