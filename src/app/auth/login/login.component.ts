import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth"; 
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: string = ''; //{errorTitle: '', errorDesc: ''};
  loginError: string;
  users: Array<any>;
  

  constructor(
				private fb: FormBuilder,
				public firebaseService: FirebaseService,
				private router: Router, 
				private authenticationService:AuthenticationService,
				public afAuth: AngularFireAuth 
    ) { }

  ngOnInit() {
	    
	  
		   if (this.firebaseService.isLoggedIn()) {
			   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
			    if(currentUser[0]['role_id']>0){ 
					  this.router.navigateByUrl('/user/dashboard');
				}
				else{ 
					this.router.navigateByUrl('/admin/dashboard');
				} 
		   } 
			this.loginForm = this.fb.group({
					  username: ['', Validators.required],
					  password: ['', Validators.required]
			}); 
	  
	
  }
  
   get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  onSubmit() {
	  
	  
	  
	   return this.afAuth.auth.signInWithEmailAndPassword(this.username.value, this.password.value)
      .then((result) => {
       if(result.operationType=='signIn'){
		        let param={
	              'username':this.username.value,
				  'password':this.password.value
				  };
				  this.firebaseService.searchUsers(param).subscribe(result => {
					  this.users = result; console.log(this.users);
					  if(this.users && this.users.length>0){
						  localStorage.setItem('currentUser', JSON.stringify(this.users));
						  if(this.users[0]['role_id']>0){ 
							  this.router.navigateByUrl('/user/dashboard');
						  }
						  else{ 
							this.router.navigateByUrl('/admin/dashboard');
						   }
					  }
					  else{ 
							error => this.error = 'Login failed';
					  }
					  
					});
		   
	   }
      }).catch((error) => {
        window.alert(error.message)
      })
	  
	  
	  
	  
	  
	  
	
	
}
}