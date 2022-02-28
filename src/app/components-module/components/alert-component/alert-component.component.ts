import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss'],
})
export class AlertComponentComponent implements OnInit {
  @Input() type!: string | undefined;
  @Input() message!: string | undefined;
  constructor() {}

  ngOnInit(): void {}
}
