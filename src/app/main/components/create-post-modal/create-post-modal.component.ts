import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {
  @Input() open!:boolean;
  @Output() onClose:EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit:EventEmitter<Post> = new EventEmitter<Post>();
  postForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm():void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  handleClose():void {
    this.onClose.emit();
    this.postForm.reset();
  }

  handleSubmitForm():void {
    if(this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.onSubmit.emit(this.postForm.value);
  }

}
