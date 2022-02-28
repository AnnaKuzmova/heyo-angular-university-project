import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth-module/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  userInfo: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData$(this.post.createdBy as number).subscribe({
      next: (response) => (this.userInfo = response),
    });
  }
}
