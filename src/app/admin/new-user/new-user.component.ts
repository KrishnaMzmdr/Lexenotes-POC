import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { FirebaseService } from '../../services/firebase/firebase.service'; 

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup; 

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
   ]
 };

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
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
      AlternateInstitution: ['', Validators.required ]
    });
  }

/*
Function Name: resetFields
Author: Krishna
This function is used for reseting the form fields to its initial condition. 
*/ 

  resetFields(){ 
    this.userForm = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      eMail: new FormControl('', Validators.required),
	  PreferEmail: new FormControl('', Validators.required),
      OfficeEmail: new FormControl('', Validators.required),
      CellPhone: new FormControl('', Validators.required),
	  OfficePhone: new FormControl('', Validators.required),
      InstitutionName: new FormControl('', Validators.required),
      AlternateInstitution: new FormControl('', Validators.required)
    });
  }
  
  
/*
Function Name: onSubmit
Author: Krishna
This function is used to submit the creation form. 
*/ 

  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}