import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	ListUser : any = [];
 
  constructor(public firebaseService: FirebaseService) { }
  
/*
Function Name: ngOnInit
Author: Krishna
Within this function Firebase service getusers is called which is used to get the user list from firestore database. 
*/

  ngOnInit() {
	  
	    let param={};
		this.ListUser=JSON.parse(localStorage.getItem('currentUser'));
   
	 
    }

}
