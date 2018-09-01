import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

// Servizi
import { UserService } from '../../services/user.service';

// Modelli
import { User } from '../../models/';

// Costanti
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.router.navigateByUrl('/mygrv');
  }
}
