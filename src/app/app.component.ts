import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertModel } from './components-module/models/alert.model';
import { AlertSerice } from './components-module/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'heyo-project';
  alert: AlertModel | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(private alertService: AlertSerice) {}

  ngOnInit(): void {
    this.alertService
      .onAlert$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (!response) {
            this.alert = null;
            return;
          }
          this.alert = response;
          setTimeout(() => {
            this.alertService.clearAlert();
          }, 3000);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
