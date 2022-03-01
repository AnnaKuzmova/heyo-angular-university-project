import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, map, mergeMap, of, take } from 'rxjs';
import { GroupModel } from 'src/app/main/models/group.model';
import { AlertSerice } from 'src/app/components-module/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/main/services/group.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent implements OnInit {
  @Input() open!: boolean;
  group: GroupModel | null = null;
  isOpen: boolean = false;
  isCreatePostModalOpen:boolean = false;
  posts: Post[] | null = null;
  constructor(
    private authService: AuthService,
    private alertService: AlertSerice,
    private groupService: GroupService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService
      .getLoggedUserGroup$(this.authService.getLoggedUser()?.id as number)
      .pipe(
        mergeMap((response) => {
          if (response.length === 0) return EMPTY;

          this.group = response[0];
          return this.postService.getAllGroupPosts$(response[0].id as number);
        }),
        take(1)
      )
      .subscribe({
        next: (response) => {
          if (!response) return;
          this.posts = [...response];
        },
      });
  }

  openDeleteModal(): void {
    this.isOpen = true;
  }

  closeDeleteModal(): void {
    this.isOpen = false;
  }

  openCreatePostModal():void {
    this.isCreatePostModalOpen = true;
  }

  closeCreatePostModal():void {
    this.isCreatePostModalOpen = false;
  }

  createPost(post: Post):void {
    this.postService.createPost$({...post, createdAt: `${new Date().getDay()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`, createdBy: this.authService.getLoggedUser()?.id, groupId: this.group?.id as number}).pipe(take(1)).subscribe({
      next: (response) => {
        this.posts?.push(response);
        this.closeCreatePostModal();
        this.alertService.success('Successfully created new post.');
      },
      error: () => {
        this.closeCreatePostModal();
        this.alertService.danger('Error occured when creating new post.')
      }
    })
  }


  deleteGroup(): void {
    this.groupService.deleteGroup$(this.group!.id as number).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.alertService.success('Successfully deleted group.');
      },
      error: () => this.alertService.danger('Error occured when deleting group.'),
    });
  }

  deletePost(id: number):void {
    this.postService.deletePost$(id).pipe(take(1)).subscribe({
      next: () =>  {
        this.posts = this.posts!.filter(post => post.id !== id);
        this.alertService.success('Successfully removed post');
      },
      error: () => this.alertService.danger('Error occured when deleting a post.')
    })
  }
}
