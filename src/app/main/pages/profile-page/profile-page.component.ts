import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { User } from 'src/app/auth-module/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: User | null;
  edit: boolean = false;
  userForm!: FormGroup;
  isDisabled: boolean = true;
  errorMessage: string = '';
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
    console.log('user', this.user);
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      username: [
        {
          value: this.user?.username,
          disabled: this.isDisabled,
        },
        [Validators.minLength(4)],
      ],
      email: [
        {
          value: this.user?.email,
          disabled: this.isDisabled,
        },
        [Validators.email],
      ],
    });
  }

  get username() {
    return this.userForm?.get('username');
  }

  get email() {
    return this.userForm?.get('email');
  }

  handleSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.authService
      .updateUser$(
        this.userForm.value.email,
        this.userForm.value.username,
        this.user?.id as number
      )
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.isDisabled = !this.isDisabled;
          this.authService.setUserToLocalStorage(response);
        },
        error: (error) => (this.errorMessage = 'Unable to update user data.'),
      });
  }
}
