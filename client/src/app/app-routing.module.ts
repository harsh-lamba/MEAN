import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PostList } from './posts/post-list/post-list.component';
import { PostCreate } from './posts/post-create/post-create.component';

const routes: Route[] = [
  {
    path: '',
    component: PostList,
  },
  {
    path: 'create',
    component: PostCreate,
  },
  {
    path: 'edit/:postId',
    component: PostCreate
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
