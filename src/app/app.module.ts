import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

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
      RouterModule.forRoot(routes)
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
