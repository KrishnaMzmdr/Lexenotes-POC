import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
	
	ListUser : any = [];
 
  constructor(public firebaseService: FirebaseService,
				private router: Router) { }
  
/*
Function Name: ngOnInit
Author: Krishna
Within this function Firebase service getusers is called which is used to get the user list from firestore database. 
*/

  ngOnInit() {
	  
	    let param={};
		 let currentUser=JSON.parse(localStorage.getItem('currentUser')); 
		if(currentUser && currentUser.length>0){ 
			if(currentUser[0]['role_id']<=0){
				this.firebaseService.getUsers().subscribe(result => {
				   this.ListUser = result;
				   console.log(this.ListUser);
				});
			}
			else{
				
			this.router.navigateByUrl('/login');
			}
		}
		else{
			this.router.navigateByUrl('/login');
		}

    }
	
	goToEdit(emailid){
	
		let url = '/admin/edituser/'+btoa(emailid);
		this.router.navigateByUrl(url);
	
	}

}
