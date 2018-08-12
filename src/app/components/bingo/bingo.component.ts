import {Component, OnInit} from '@angular/core';
import {BingoService} from "../../services/bingo.service";
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-bingo',
    templateUrl: './bingo.component.html',
    styleUrls: ['./bingo.component.css'],
    providers: [BingoService]
})
export class BingoComponent {

    cells: any = null;
    my_cells: any = [];

    constructor(public bingoService: BingoService) {

        forkJoin(
            this.bingoService.getBingoCells(),
            this.bingoService.getMyBingo()
        )
            .subscribe(data => {
                console.log(data);
                this.initBingoCells(data[1], data[0]);
            });
    }

    public toggleCell(id) {
        if (this.isChecked(id)) {
            this.my_cells = this.my_cells.filter(item => item != id);
        } else {
            this.my_cells.push(id);
        }
        this.bingoService.setBingoCells(id)
            .subscribe(data => {
                console.log(data);
            });
    }

    private initBingoCells(myCells, cells) {
        this.my_cells = myCells;
        this.cells = cells;
    }

    protected isChecked(id: number) {
        return this.my_cells.indexOf(id) !== -1;
    }
}
