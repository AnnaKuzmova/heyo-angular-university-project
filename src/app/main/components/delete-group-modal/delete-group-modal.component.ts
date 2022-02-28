import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-group-modal',
  templateUrl: './delete-group-modal.component.html',
  styleUrls: ['./delete-group-modal.component.scss'],
})
export class DeleteGroupModalComponent implements OnInit {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Input() open!: boolean;
  constructor() {}

  ngOnInit(): void {}

  onCancelBtnClick(): void {
    this.onCancel.emit();
  }

  onDeleteBtnClick(): void {
    this.onDelete.emit();
  }
}
