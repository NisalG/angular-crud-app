import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      content: ['', Validators.required],
      category_id: [0, Validators.required],
      published_at: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      this.loadPost(this.id);
    } else {
      // Handle the case where the ID is null
      console.error('Invalid post ID');
      this.router.navigate(['/']);
    }
  }

  loadPost(id: number): void {
    this.postService.getPost(id).subscribe(post => {
      this.postForm.patchValue(post);
    });
  }

  onSubmit(): void {
    if (this.postForm.valid && this.id) {
      const updatedPost: Post = this.postForm.value;
      this.postService.updatePost(this.id, updatedPost).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
