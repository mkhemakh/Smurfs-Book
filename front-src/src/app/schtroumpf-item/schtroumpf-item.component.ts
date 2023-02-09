import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-schtroumpf-item',
  templateUrl: './schtroumpf-item.component.html',
  styleUrls: ['./schtroumpf-item.component.css'],
})
export class SchtroumpfItemComponent implements OnInit {
  users: any[] = [];
  form: any = {
    friendname: null,
  };
  currentUser: any;
  loggedInUser: any;

  constructor(private userService: UserService, private storageService: StorageService) { }

  addFriend(friendname: string) {
      this.userService.addFriend(this.currentUser, friendname).subscribe(() => {
        console.log('Friend added successfully');
        this.reloadPage();
      }, error => {
        console.error(error);
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = <any[]>users;
    });
    this.currentUser = this.storageService.getUser().username;
    this.loggedInUser = this.storageService.isLoggedIn();
  }
}