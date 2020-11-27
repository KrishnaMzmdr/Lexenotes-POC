import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service'; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
	
	ListUser : any = [];
 
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
	  
	    let param={};
   
		this.firebaseService.getUsers().subscribe(result => {
		   this.ListUser = result;
		});

    }

}