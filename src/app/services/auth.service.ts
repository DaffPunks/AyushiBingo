import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends RestService {

    private loggedIn = false;

    constructor(public http: HttpClient) {
        super(http);

        this.loggedIn = !!localStorage.getItem('hash');
    }

    public login(username: string, password: string) {
        return this.requestPOST('login', {
            'username': username,
            'password': password
        })
            .pipe(
                map(data => {
                    localStorage.setItem('hash', data.token);
                    this.loggedIn = true;
                    return data;
                })
            );
    }

    public register(username: string, password: string) {
        return this.requestPOST('register', {
            'username': username,
            'password': password
        })
            .pipe(
                map(data => {
                    localStorage.setItem('hash', data.token);
                    this.loggedIn = true;
                    return data;
                })
            );
    }

    public logout() {
        localStorage.removeItem('hash');
        this.loggedIn = false;
    }

    public isLoggedIn() {
        return !!localStorage.getItem('hash');
    }


}
