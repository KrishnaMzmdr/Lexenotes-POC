import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth"; 
 

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
  msg: string = '';
  id: string = '';
  

  constructor(
				private fb: FormBuilder,
				public firebaseService: FirebaseService,
				private router: Router, 
				private activatedRoute: ActivatedRoute,
				private authenticationService:AuthenticationService,
				public afAuth: AngularFireAuth 
    ) { }

  ngOnInit() {
	  
	    this.activatedRoute.params.subscribe(routeParams => {
			this.id = routeParams['id'];
			
			this.afAuth.auth.sendPasswordResetEmail(atob(this.id))
					.then(() => {
					  this.msg = 'Password reset email sent, check user\'s inbox.';
					}).catch((error) => {
					  window.alert(error)
			})
		});
   
		   
			 
	  
  }
  
   get newpassword() { return this.genpassForm.get('newpassword'); }
  get confirmpassword() { return this.genpassForm.get('confirmpassword'); }


  onSubmit() { 
   
					return this.afAuth.auth.sendPasswordResetEmail(atob(this.id))
					.then(() => {
					  window.alert('Password reset email sent, check your inbox.');
					}).catch((error) => {
					  window.alert(error)
					})
				 
  
	  
  }
}
