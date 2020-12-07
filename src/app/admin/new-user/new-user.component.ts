import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { AngularFireAuth } from "@angular/fire/auth"; 

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup; 
  AllRoles : any = [];

  validation_messages = {
   'fname': [
     { type: 'required', message: 'First Name is required.' }
   ],
   'lname': [
     { type: 'required', message: 'Last Name is required.' }
   ],
   'eMail': [
     { type: 'required', message: 'Email is required.' },
   ],
   'PreferEmail': [
     { type: 'required', message: 'Prefer Email is required.' }
   ],
   'OfficeEmail': [
     { type: 'required', message: 'Office Email is required.' }
   ],
   'CellPhone': [
     { type: 'required', message: 'Cell Phone is required.' },
   ],
   'OfficePhone': [
     { type: 'required', message: 'Office Phone is required.' }
   ],
   'InstitutionName': [
     { type: 'required', message: 'Institution Name is required.' }
   ],
   'AlternateInstitution': [
     { type: 'required', message: 'Alternate Institution is required.' },
   ],
   'role_id': [
     { type: 'required', message: 'Role is required.' },
   ],
 };

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public firebaseService: FirebaseService,
	public afAuth: AngularFireAuth 
  ) { }

  ngOnInit() {
	this.getRoles();  
    this.createForm();
  }
  
/*
Function Name: createForm
Author: Krishna
This function is used for creating the user addition form. 
*/

  createForm() {
    this.userForm = this.fb.group({
      fname: ['', Validators.required ],
      lname: ['', Validators.required ],
      eMail: ['', Validators.required ],
	  PreferEmail: ['', Validators.required ],
      OfficeEmail: ['', Validators.required ],
      CellPhone: ['', Validators.required ],
	  OfficePhone: ['', Validators.required ],
      InstitutionName: ['', Validators.required ],
      AlternateInstitution: ['', Validators.required ],
	  role_id: ['', Validators.required ]
    });
  }

 
  
/*
Function Name: onSubmit
Author: Krishna
This function is used to submit the creation form. 
*/ 

  onSubmit(value){
	 let psw = '123456'; 
	 this.afAuth.auth.createUserWithEmailAndPassword(value.eMail, psw)
      .then((result) => {
      
			this.firebaseService.createUser(value)
				.then(
				  res => { 
					this.userForm.reset();
					this.router.navigate(['/generatepassword/',btoa(value.eMail)]);
				  }
			)
	   
      }).catch((error) => {
        window.alert(error.message)
      })
	   
  
  }
  
  
  
 
 getRoles(){
		this.firebaseService.getRoles().subscribe(result => {
			   this.AllRoles = result[0]['role']; 
		});
  }

}