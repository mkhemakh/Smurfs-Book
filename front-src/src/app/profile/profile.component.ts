import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';


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

  constructor(private storageService: StorageService, private userService: UserService) { }

  delFriend(friendname: string) {
    this.userService.delFriend(this.currentUser.username, friendname).subscribe(() => {
      console.log('Friend removed successfully');
      this.reloadPage();
    }, error => {
      console.error(error);
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = <any[]>users;
    });
    this.currentUser = this.storageService.getUser();
    this.loggedInUser = this.storageService.isLoggedIn();
  }
}
