import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Router} from "@angular/router";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";
import {AuthActionTypes, LogIn, LogInSuccess,LogInFailure,
    SignUp, SignUpSuccess, SignUpFailure, LogOut,GetStatus } from "../actions/auth.actions";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {AuthService} from "../../services/auth.service";

@Injectable()
export  class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router
    ){}

    // effects go here

    // Erklärungstext aus dem Tutorial
    //The ofType operator filters the action by a type. It accepts multiple action types, so one effect can handle a number of actions.
    //Then, with map, we “map” the action to its payload. This, essentially, returns an observable with just the payload.
    //The switchMap is used to switch back to the response observable but still use the payload as an argument in the switchMap function.

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .map( (action: LogIn) => action.payload)
        .switchMap(payload => {
            return this.authService.login(payload.email, payload.password)
                .map((user) => {
                    console.log('Login; ' +JSON.stringify(user)) ;
                    return new LogInSuccess({token: user.token, email: payload.email});
                })
                .catch( (error) => {
                    console.log(error);
                    return Observable.of(new LogInFailure({error: error}));
                })
        })


    // Add effect (to add token to localStorage and redirect user)
    //Version 5.5 of RXJS introduced the pipe method, which is used to compose a number of functions to act on the observable.
    // Again, ofType associates the effect with an action while tap performs a side effect transparently. In other words, it returns an observable
    // identical to the source. In our case, we’re adding the token to localStorage and then redirecting the user to /.

    @Effect({dispatch: false})
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap( (user)=> {
            console.log('LoginSuccess; ' +JSON.stringify(user)) ;
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    )

    @Effect({dispatch: false})
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions
        .ofType(AuthActionTypes.SIGNUP)
        .map((action: SignUp) => action.payload)
        .switchMap(payload => {
            return this.authService.signup(payload.email, payload.password)
                .map( (user) => {
                    console.log(user);
                    return new SignUpSuccess({token: user.token, email: payload.email})
                })
                .catch( (error) => {
                    console.log(error);
                    return Observable.of(new SignUpFailure({error: error}));
                })
        })

    @Effect({dispatch: false})
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap( (user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    )

    @Effect({dispatch: false})
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({dispatch: false})
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap( (user) => {
            localStorage.removeItem('token');
        })
    )

    @Effect({dispatch: false})
    GetStatus: Observable<any> = this.actions
        .ofType(AuthActionTypes.GET_STATUS)
        .switchMap(payload => {
            return this.authService.getStatus()
        });
}
