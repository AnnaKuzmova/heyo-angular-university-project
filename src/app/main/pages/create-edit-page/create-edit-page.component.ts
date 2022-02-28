import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertSerice } from 'src/app/components-module/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/main/services/group.service';

@Component({
  selector: 'app-create-edit-page',
  templateUrl: './create-edit-page.component.html',
  styleUrls: ['./create-edit-page.component.scss'],
})
export class CreateEditPageComponent implements OnInit {
  groupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private groupService: GroupService,
    private alertService: AlertSerice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get name() {
    return this.groupForm.get('name');
  }

  get description() {
    return this.groupForm.get('description');
  }

  handleSubmit(): void {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }
    this.groupService
      .createGroup$({
        ...this.groupForm.value,
        admin: this.authService.getLoggedUser()?.id as number,
        members: [],
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/group']);
          this.alertService.success();
        },
        error: () => this.alertService.danger(),
      });
  }
}
