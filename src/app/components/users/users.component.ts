import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-posts',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allData: any;
  userId: any;
  userType: any;
  userData: any;
  isAuthenticated = false;
  check: any = [];


  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.allData = this.fetchAll();
    this.userId = this.authService.userId;
    // this.userType = this.authService.userType;

    this.allData.subscribe((res: any) => {
      // this.check = res;
      // console.log(this.check)
      for (var i in res) {
        // console.log(res[i])
        if (this.userId === res[i].id) {
          this.userType = res[i].type;
          this.userData = res[i];
        }
        if (res[i].type === 'User') {
          this.check.push(res[i]);
        }
      }
      // console.log(this.check)
    })

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })


  }


  fetchAll(): Observable<any> {
    return this.userService.fetchAll();
  }

  delete(id: any): void {
    this.userService.deleteData(id).subscribe(() => {
      if (this.userType === 'User') {
        this.logout();
      } else {
        this.allData.subscribe((res: any) => {
          this.check = [];
          for (var i in res) {
            if (res[i].type === 'User') {
              this.check.push(res[i]);
            }
          }
        })
      }
    })

  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['signup']);
  }

}
