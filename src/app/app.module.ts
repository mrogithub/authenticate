import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import {AuthService} from "./services/auth.service";
import {AuthEffects} from "./store/effects/auth.effects";

const routes: Routes =[{path: 'log-in', component: LogInComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: '', component: LandingComponent},
    { path: '**', redirectTo: '/'}];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpClientModule,
      EffectsModule.forRoot([AuthEffects]),
      RouterModule.forRoot(routes)
          ],
  providers: [AuthService],        // Bereitstellung eines eigenen Services
  bootstrap: [AppComponent]
})
export class AppModule { }
