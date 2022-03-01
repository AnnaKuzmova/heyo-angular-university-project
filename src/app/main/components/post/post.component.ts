import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  idDisabled:boolean = false;
  postForm!: FormGroup;
  constructor(private authService: AuthService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.authService.getUserData$(this.post.createdBy as number).subscribe({
      next: (response) => (this.userInfo = response),
    });

    this.loggedUser = this.authService.getLoggedUser();
    this.buildForm();
  }

  handleDelete():void{
    console.log(this.post)
    this.onDelete.emit(this.post.id);
  }

  buildForm():void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }
}
