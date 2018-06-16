import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { User } from '../../models/user';
import {AppState} from "../../store/app.states";
import {SignUp} from '../../store/actions/auth.actions'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    user: User = new User();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

    onSubmit(): void {
        console.log(this.user);
        const payload = {
            email: this.user.email,
            password: this.user.password
        };
        this.store.dispatch(new SignUp(payload))
    }
}
