import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servizi
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.LoggedUserToken = null;
    this.router.navigateByUrl('/relogin');
  }
}
