import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { AngularFireAuth } from "@angular/fire/auth"; 

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup; 
  ListUser : any = [];
  AllRoles : any = [];
  id:string = '';
  eMail:string = '';
  flag: boolean;
  role: number;

  validation_messages = {
   'fname': [
     { type: 'required', message: 'First Name is required.' }
   ],
   'lname': [
     { type: 'required', message: 'Last Name is required.' }
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
   'status': [
     { type: 'required', message: 'Status is required.' },
   ],
 };

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public firebaseService: FirebaseService,
	public afAuth: AngularFireAuth, 
	private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   
	this.createForm();
		this.activatedRoute.params.subscribe(routeParams => {
			this.id = routeParams['id'];
			this.getRoles();
			
			this.firebaseService.searchUsersByEmail(this.id).subscribe(result => {
			   this.ListUser = result; console.log(result);
			   this.eMail = this.ListUser[0].eMail;
			   this.flag = this.ListUser[0].status; 
			   this.role = this.ListUser[0].role_id; 
			   
			   		  
			   this.userForm.get('fname').setValue(this.ListUser[0].fname);
			   this.userForm.get('lname').setValue(this.ListUser[0].lname); 
			   this.userForm.get('PreferEmail').setValue(this.ListUser[0].PreferEmail);
			   this.userForm.get('OfficeEmail').setValue(this.ListUser[0].OfficeEmail);
			   this.userForm.get('CellPhone').setValue(this.ListUser[0].CellPhone);
			   this.userForm.get('OfficePhone').setValue(this.ListUser[0].OfficePhone);
			   this.userForm.get('InstitutionName').setValue(this.ListUser[0].InstitutionName);
			   this.userForm.get('AlternateInstitution').setValue(this.ListUser[0].AlternateInstitution); 
			   this.userForm.get('status').setValue(this.ListUser[0].status); 
			   this.userForm.get('role_id').setValue(this.ListUser[0].role_id); 
			    
			});
		 
		});
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
	  PreferEmail: ['', Validators.required ],
      OfficeEmail: ['', Validators.required ],
      CellPhone: ['', Validators.required ],
	  OfficePhone: ['', Validators.required ],
      InstitutionName: ['', Validators.required ],
      AlternateInstitution: ['', Validators.required ],
	  status: ['', Validators.required ],
	  role_id: ['', Validators.required ]
    });
  }

 
  
/*
Function Name: onSubmit
Author: Krishna
This function is used to submit the creation form. 
*/ 

  onSubmit(value){
        this.SendVerificationMail(); 
	     value.eMail = this.eMail; 
			this.firebaseService.updateUser(this.ListUser[0].customIdName ,value)
				.then(
				  res => {
					this.router.navigate(['/admin/dashboard']);
				  }
			)
	   
     
  
  }
  
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['/admin/dashboard']);
    })
  }
  
  getRoles(){
		this.firebaseService.getRoles().subscribe(result => {
			   this.AllRoles = result[0]['role']; 
		});
  }

}