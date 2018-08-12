import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    @Output() loginIn = new EventEmitter();

    screen: string = 'login';

    username: string = '';
    password: string = '';
    repassword: string = '';

    constructor(public authService: AuthService) {

    }

    ngOnInit() {
    }

    changeScreen(goTo: string) {
        this.screen = goTo;
    }

    doLogin() {
        this.authService.login(this.username, this.password)
            .subscribe(() => {
                this.loginIn.emit();
            });
    }

    doRegister() {
        this.authService.register(this.username, this.password)
            .subscribe(() => {
                this.loginIn.emit();
            });
    }
}
