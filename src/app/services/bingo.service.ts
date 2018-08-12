import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BingoService extends RestService {

    constructor(public http: HttpClient) {
        super(http);
    }

    public getBingoCells() {
        return this.requestGET('bingo');
    }

    public getMyBingo() {
        return this.requestGET('my/bingo');
    }

    public setBingoCells(id) {
        return this.requestPOST('my/check', {
            cell_id: id
        });
    }
}
