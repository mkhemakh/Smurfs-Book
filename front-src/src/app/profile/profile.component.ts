import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../_services/auth.service';

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

  form: any = {
    username: null,
    email: null,
    role: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private storageService: StorageService, private userService: UserService, private authService: AuthService) { }

  delFriend(friendname: string) {
    this.userService.delFriend(this.currentUser.username, friendname).subscribe(() => {
      console.log('Friend removed successfully');
      this.reloadPage();
    }, error => {
      console.error(error);
    });
  }

  addFriend(friendname: string) {
    this.userService.addFriend(this.currentUser.username, friendname).subscribe(() => {
      console.log('Friend added successfully');
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

  onUpdateRole():void {
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

  onSubmit(): void {
    const { username, email, role, password } = this.form;

    this.authService.register(username, email, role, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    this.addFriend(username);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = <any[]>users;
    });
    this.currentUser = this.storageService.getUser();
    this.loggedInUser = this.storageService.isLoggedIn();
  }
}
