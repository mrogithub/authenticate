import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState, selectAuthState} from "../../store/app.states";
import { LogOut} from '../../store/actions/auth.actions';
import {Observable} from "rxjs/Observable";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(private store: Store<AppState>, private translate: TranslateService){
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe( (state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user            = state.user;
      this.errorMessage    = state.errorMessage;
    })
  }

  logout(): void {
    this.store.dispatch(new LogOut)
  }
}