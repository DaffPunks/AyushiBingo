import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ApiResponse} from "../interfaces/api-response";
import {throwError} from "rxjs";
import {catchError, map, retry, tap} from "rxjs/operators";

@Injectable()
export abstract class RestService {

    public baseUrl = "http://ayu.develop/";
    protected apiUrl = "rest/";

    protected token = '';

    constructor(public http: HttpClient) {
        console.log('Rest Service Initialized!');
    }

    protected getUrl(url: string) {
        return this.baseUrl + this.apiUrl + url;
    }

    private createAuthHeader() {
        return new HttpHeaders({
            'Hash': !!localStorage.getItem('hash') ? localStorage.getItem('hash') : ''
        });
    }

    protected requestGET(url: string, data: any = null) {
        return this.http.get<ApiResponse>(this.getUrl(url), {
            params: data,
            headers: this.createAuthHeader()
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                map(this.handleRequest)
            );
    }

    protected requestPOST(url: string, data: any = null) {
        return this.http.post<ApiResponse>(this.getUrl(url), null,{
            params: data,
            headers: this.createAuthHeader()
        })
            .pipe(
                retry(1), // retry a failed request up to 3 times
                catchError(this.handleError), // then handle the error
                map(this.handleRequest)
            );
    }


    private handleRequest(data: ApiResponse) {
        return data.message;
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was:`, error);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };


}
