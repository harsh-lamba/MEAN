import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreate implements OnInit{
  private mode: string = "create";
  public post: Post;
  public isLoader: boolean;
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router){}

  public ngOnInit(){
    this.isLoader = false;
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.isLoader = true;
        this.postService.getPost(postId).subscribe(post=> {
          this.post = post;
          this.isLoader = false;
        });
      } else {
        this.mode = 'create';
        this.post = null
      }
    })
  }

  public savePost(postForm: NgForm){
    if (postForm.invalid) return;

    if (this.mode ==='create'){
      this.postService.addPost(postForm.value.title, postForm.value.description);
    } else {
      this.postService.updatePost(this.post.id, postForm.value.title, postForm.value.description);
    }

    postForm.resetForm();
    this.router.navigate(["/"])
  }

}
