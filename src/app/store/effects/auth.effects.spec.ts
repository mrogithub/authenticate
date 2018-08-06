import {Actions} from "@ngrx/effects";
import {cold} from 'jasmine-marbles';

import {AuthEffects} from "./auth.effects";
import {AuthActionTypes, LogIn, LogInSuccess,LogInFailure,
    SignUp, SignUpSuccess, SignUpFailure, LogOut,GetStatus } from "../actions/auth.actions";

import {} from 'jasmine';

//TODO die sollte man vielleicht mocken
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {TestBed,inject} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {HttpEvent, HttpResponse} from "@angular/common/http";

function createServiceStub( response: any){

    const service = jasmine.createSpyObj('authService', ['login']);

    const isError = response instanceof Error;
    const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

    service.login.and.returnValue(  {
        token: '1234567',
        status: 'success'
    });

    return service;
}
function createAuthServiceStub(){

    const service = jasmine.createSpyObj('authService', ['login']);


    let obs = Observable.create( (observer:any) => {
        observer.next({status: 'success', token: '321'});
    });

    service.login.and.returnValue(  obs );

    return service;
}

describe('Suite for testing auth effects', () => {

    beforeEach(function(){

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));


    it('should mock an http request to the authservice.login',inject( [HttpTestingController, AuthService],
        (httpMock: HttpTestingController, authService: AuthService) => {
             const mockData = { status: 'success', token: '1234567'};

             authService.login('bla@bla.bla', 'geheim').subscribe( (event: HttpEvent<any>) => {
                 console.log('event.type: ' +event.type);
                 console.log('event: ' +JSON.stringify(event));

                 expect(event['status']).toBe('success');
                 expect(event['token']).toBe('abc');

        },
                 (error) => { console.log('Oh Mist ein Fehler')},
                 () => {'...schon vorbei'}
        );

            const req = httpMock.expectOne('http://localhost:1337/login');
            expect(req.request.method).toEqual('POST');

            req.flush({status: 'success', token: 'abc'});

    })
    );

    it('should use the mocked authService login method', () => {

        let auth = createAuthServiceStub();

        auth.login().subscribe(
            (data) => {console.log("Received data: " +JSON.stringify(data)) },
            (error) => {console.log(' Oops an error: ' +error) },
            () => {console.log('Done') }
        )
    })

    xit('it should create a LogInScuccess action (an observable)for the Login Effect', () =>{
        console.log('Starting with a basic test for the Login Effect');

        let auth = createServiceStub( {token: '123456789'});
        let route: Router;

        const source = cold('a', { a: { type: AuthActionTypes.LOGIN,
                payload: {email: 'test@bla.com', password: 'foo'} }}); // erstellt eine Observable
        const effects = new AuthEffects(new Actions(source), auth, route);

         console.log('Done with the preparations');

        const expected = cold('--a', { a: {type: AuthActionTypes.LOGIN_SUCCESS}});
        const obsLogin = effects.LogIn;

        obsLogin.subscribe(
            (x:any) => { console.log("Received x: " +x)},
            (error:any) => { },
            () => { console.log('Done')}
        );
        expect(effects).toBeDefined();
        expect(source).toBeObservable(source);
        expect(expected).toBeObservable(expected);
        expect(obsLogin).toBeDefined();

         expect(obsLogin).toBeObservable(expected);

    })

});