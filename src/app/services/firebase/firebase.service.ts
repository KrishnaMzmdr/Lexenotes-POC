import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users',ref => ref
	 .where('role_id', '>=', 0)).valueChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref
	 .where('eMail', '==', searchValue.username)
	 .where('password', '==', btoa(searchValue.password))
	 ).valueChanges();
  }
  
   isLoggedIn() { 
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
  
   logout() {
    localStorage.removeItem('currentUser');
	//this.isLoggedIn();
  }
}