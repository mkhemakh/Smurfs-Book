import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';
//import { User } from '../user.interface';
@Component({
  selector: 'app-schtroumpf-item',
  templateUrl: './schtroumpf-item.component.html',
  styleUrls: ['./schtroumpf-item.component.css'],
})
export class SchtroumpfItemComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = <any[]>users;
    });
  }
}