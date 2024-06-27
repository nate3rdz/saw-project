import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(private formBuilderService: FormBuilder, private userService: UserService, private toastrService: ToastrService, private routerService: Router) {

  }

  protected signUpForm: FormGroup = this.formBuilderService.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  protected submit() {
    if (!this.signUpForm.valid) {
      this.toastrService.error(
        'Given data is not valid. Please, check it.',
        'Invalid form data', {
          timeOut: 3000
        }
      )
      return;
    }

    this.userService.register(
      this.signUpForm.get('username')?.value,
      this.signUpForm.get('email')?.value,
      this.signUpForm.get('password')?.value,
    ).subscribe({
      next: (data) => {
        this.toastrService.success(
          'Sign-up completed with success. Now redirecting to login page...',
          'Success', {
            timeOut: 3000
          }
        );

        this.routerService.navigate(['/login']);
      }
    })
  }
}
