import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
      });
    }
  }
}
