/************************ This service page is used for insert update delete and fetch data from firebase ***********************/


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}
  
/****
Function Name: getUser
Author: Krishna
This service function is used to get each user record according to key from firestore database. 
****/

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }
  
/****
Function Name: updateUser
Author: Krishna
This service function is used to update each user record according to key from firestore database. 
****/

  updateUser(userkey,data){
    data.password = data.pasword;
    return this.db.collection('users').doc(atob(userkey)).set(data);
  }
  
/****
Function Name: deleteUser
Author: Krishna
This service function is used to delete each user record according to key from firestore database. 
****/

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }
  
/****
Function Name: getUsers
Author: Krishna
This service function is used to get user list from firestore database. 
****/  

  getUsers(){
    return this.db.collection('users',ref => ref
	 .where('role_id', '>=', 0)).valueChanges();
  }

/****
Function Name: searchUsers
Author: Krishna
This service function is used to get user list according to search key from firestore database. 
****/


  searchUsers(searchValue){
    return this.db.collection('users',ref => ref
	 .where('eMail', '==', searchValue.username)).valueChanges();
  }
  
  /****
Function Name: isLoggedIn
Author: Krishna
This service function is used to log in firestore database. 
****/
  
   isLoggedIn() { 
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

/****
Function Name: createUser
Author: Krishna
This service function is used to add new user to firestore database. 
****/

  createUser(value){
    return this.db.collection('users').add({
		  fname: value.fname,
		  lname: value.lname,
		  eMail: value.eMail,
		  PreferEmail: value.PreferEmail,
		  OfficeEmail: value.OfficeEmail,
		  CellPhone: value.CellPhone,
		  OfficePhone: value.OfficePhone,
		  InstitutionName: value.InstitutionName,
		  AlternateInstitution: value.AlternateInstitution,
		  role_id: 2,
		  status:true,
		  confirmationLink: 'https://test-project-cd799.web.app/generatepassword/'+btoa(value.eMail)
    });
  }
  
/****
Function Name: logout
Author: Krishna
This service function is used to logout from firestore database. 
****/  
  
   logout() {
    localStorage.removeItem('currentUser'); 
  }
}