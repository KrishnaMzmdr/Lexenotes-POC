import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;
  users: Array<any>;
  

  constructor(
				private fb: FormBuilder,
				public firebaseService: FirebaseService,
				private router: Router, 
				private authenticationService:AuthenticationService
    ) { }

  ngOnInit() {
	 
	   this.authenticationService.AuthSignIn(); 
	  if(this.authenticationService.isAuthenticated()){	
	  
		   if (this.firebaseService.isLoggedIn()) {
				this.router.navigateByUrl('/admin/dashboard');
		   } 
			this.loginForm = this.fb.group({
					  username: ['', Validators.required],
					  password: ['', Validators.required]
			}); 
	  }
	  else{
	  
			console.log('User Authentication failed');
	  } 
  }
  
   get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  onSubmit() {
	  console.log(this.username.value+'===='+this.password.value);
	  let param={
	              'username':this.username.value,
				  'password':this.password.value
	  };
	  this.firebaseService.searchUsers(param).subscribe(result => {
		  this.users = result;

		  if(this.users && this.users.length>0){
			  localStorage.setItem('currentUser', JSON.stringify(this.users));
			  this.router.navigateByUrl('/admin/dashboard');
		  }
		  else{
				error => this.error = error
		  }
		  
		});
	  
	  
	
 
  }
}
