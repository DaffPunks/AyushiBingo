import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {BingoComponent} from './components/bingo/bingo.component';
import {FriendComponent} from './components/friend/friend.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        BingoComponent,
        FriendComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
