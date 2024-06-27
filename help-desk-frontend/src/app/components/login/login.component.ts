import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private formBuilderService: FormBuilder,
    private toastrService: ToastrService,
    private routerService: Router,
    private userService: UserService,
    private authService: AuthService,
    private meService: MeService
  ) {

  }

  protected loginForm: FormGroup = this.formBuilderService.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  protected submit() {
    if (!this.loginForm.valid) {
      this.toastrService.error(
        'Given data is not valid. Please, check it.',
        'Invalid form data', {
        timeOut: 3000
      }
      )
      return;
    }

    this.userService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value,
    ).subscribe({
      next: (data) => {
        if (!data?.body?.token)
          return;

        this.authService.login(data?.body?.token);

        this.meService.me().subscribe({
          next: (me) => {
            this.toastrService.success(
              'Login executed with success. Now redirecting to the homepage.',
              'Success', {
              timeOut: 3000
            }
            );
            this.routerService.navigate(['/'])
          }
        })
      }
    })

  }
}
