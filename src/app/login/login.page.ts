import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService) {
    this.signInForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }),
    });
  }



  submitSignInForm() {
    this.commonService.showLoader();
    this.apiService.signIn(this.signInForm.value.user.email,this.signInForm.value.user.password).subscribe(response => {
      console.log('response is: ', response);
      if (response.status === 200) {
        this.commonService.hideLoader();
        this.commonService.showToastMessage('login successful')
        localStorage.setItem('user',response.token)
        this.router.navigate(['/tabs/tabs/tab1'])
      }
    }, (error) => {
      this.commonService.hideLoader();
      this.signInForm.controls['password'].reset();
      this.commonService.showToastMessage(error)
    });
  }

}
