import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule, MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreate } from './posts/post-create/post-create.component';
import { PostList } from './posts/post-list/post-list.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    PostCreate,
    HeaderComponent,
    PostList
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
