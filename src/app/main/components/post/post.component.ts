import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/auth-module/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Output() onDelete = new EventEmitter<number>();
  loggedUser!: User | null;
  userInfo: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData$(this.post.createdBy as number).subscribe({
      next: (response) => (this.userInfo = response),
    });

    this.loggedUser = this.authService.getLoggedUser();
  }

  handleDelete():void{
    console.log(this.post)
    this.onDelete.emit(this.post.id);
  }
}
