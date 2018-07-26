import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servizi
import { UserService, PlayerService } from '../../services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private userService: UserService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {}

  doLogin(): void {
    if (!this.username || !this.password) {
      return;
    }

    this.userService.Login(this.username, this.password).subscribe(res => {
      if (!res.error && !!res.payload) {
        this.userService.LoggedUserToken = res.payload;

        this.playerService.GetCurrentPlayer().subscribe(playerRes => {
          if (!playerRes.error && !!playerRes.payload) {
            this.userService.PlayerData = playerRes.payload;
            this.router.navigateByUrl('/');
          }
        });
      }
    });
  }
}
