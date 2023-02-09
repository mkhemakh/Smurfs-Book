import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  users: any[] = [];
  friendslist: any[] = [];
  loggedInUser: any;
  showModif: boolean = false;
  private subject = new Subject<any>();
  newrole: string = '';

  constructor(private storageService: StorageService, private userService: UserService) { }

  delFriend(friendname: string) {
    this.userService.delFriend(this.currentUser.username, friendname).subscribe(() => {
      console.log('Friend removed successfully');
      this.reloadPage();
    }, error => {
      console.error(error);
    });
  }

  toggleModif(): void {
    this.showModif = !this.showModif;
    this.subject.next(this.showModif);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit():void {
    if (!this.newrole) {
      alert('Please add a role!');
      return;
    }
    this.userService.updateRole(this.currentUser.username, this.newrole).subscribe(() => {
      console.log('Role modified successfully');
    }, error => {
      console.error(error);
    });
    this.currentUser = this.storageService.getUser();

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = <any[]>users;
    });
    this.currentUser = this.storageService.getUser();
    this.loggedInUser = this.storageService.isLoggedIn();
  }
}
