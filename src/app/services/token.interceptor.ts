import {Injectable, Injector} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  private authService: AuthService;

  constructor(private injector: Injector) { }

  // Interceptor der jedem HTTP-Request das Authorisierungstoken im Header mitgibt.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return next.handle(request);
  }

}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private router: Router){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    return next.handle(request)
        .catch((response: any) => {
      if(response instanceof HttpErrorResponse && response.status === 401){
        console.log(response);
      }
      return Observable.throw(response);
      });
  }

}