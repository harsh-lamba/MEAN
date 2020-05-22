import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.interface';
import { MiMeTypeValidator } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreate implements OnInit {
  private mode: string = 'create';
  public post: Post;
  public isLoader: boolean;
  public postForm: FormGroup;
  public imagePreview: string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    this.initForm();
    this.isLoader = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.isLoader = true;
        this.postService.getPost(postId).subscribe((post) => {
          this.post = post;
          this.isLoader = false;
          this.postForm.setValue({
            id: post.id,
            title: post.title,
            description: post.description,
            image: post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.post = null;
      }
    });
  }

  public savePost() {
    if (this.postForm.invalid) return;

    if (this.mode === 'create') {
      this.postService.addPost(
        this.postForm.value.title,
        this.postForm.value.description,
        this.postForm.value.image
      );
    } else {
      this.postService.updatePost(
        this.postForm.value.id,
        this.postForm.value.title,
        this.postForm.value.description,
        this.postForm.value.image
      );
    }

    this.postForm.reset();
    this.router.navigate(['/']);
  }

  public onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get("image").updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

  private initForm() {
    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [MiMeTypeValidator],
      }),
    });
  }
}
