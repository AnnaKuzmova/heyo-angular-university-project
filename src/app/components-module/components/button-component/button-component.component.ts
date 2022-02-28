import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss'],
})
export class ButtonComponentComponent implements OnInit {
  @Output() onClick = new EventEmitter<void>();
  @Input() btnType!: string;
  constructor() {}

  ngOnInit(): void {}

  onBtnClick(): void {
    this.onClick.emit();
  }
}
