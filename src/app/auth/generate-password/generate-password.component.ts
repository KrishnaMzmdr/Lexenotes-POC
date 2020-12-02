import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-genpass',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  genpassForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  genpassError: string;
  users: Array<any>;
  mode: string = '';
  

  constructor(
				private fb: FormBuilder,
				public firebaseService: FirebaseService,
				private router: Router, 
				private activatedRoute: ActivatedRoute,
				private authenticationService:AuthenticationService
    ) { }

  ngOnInit() {
	 
	   this.authenticationService.AuthSignIn(); 
	  if(this.authenticationService.isAuthenticated()){	
	    this.activatedRoute.params.subscribe(routeParams => {
			this.id = routeParams['id'];
		});
   
		   
			this.genpassForm = this.fb.group({
					  newpassword: ['', Validators.required],
					  confirmpassword: ['', Validators.required]
			}); 
	  }
	  else{
	  
			console.log('User Authentication failed');
	  } 
  }
  
   get newpassword() { return this.genpassForm.get('newpassword'); }
  get confirmpassword() { return this.genpassForm.get('confirmpassword'); }


  onSubmit() { 
	  if(this.newpassword.value!=this.confirmpassword.value){
		   this.genpassError = 'Password Mismatch';
	  }
	  else{
				let param={
							  'password':btoa(this.newpassword.value) 
				};
		  
				 this.firebaseService.updateUser(this.id,param)
				.then(
				  res => { 
				  }
				)
	
	  }
	  
  }
}
