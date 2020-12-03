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
		 this.ListUser=JSON.parse(localStorage.getItem('currentUser')); 
		if(this.ListUser && this.ListUser.length>0){
			this.firebaseService.getUsers().subscribe(result => {
			   this.ListUser = result;
			});
		}
		else{
			this.router.navigateByUrl('/login');
		}

    }

}
