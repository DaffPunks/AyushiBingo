import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    friendCells: any = [
        '01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25',
    ];
    loggedIn: boolean = false;

    constructor(public authService: AuthService) {
        this.loggedIn = this.authService.isLoggedIn();
    }

    loginEvent() {
        this.loggedIn = true;
    }

    logout() {
        this.authService.logout();
        this.loggedIn = false;
    }

}
