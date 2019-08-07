import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StrengthBarComponent } from './components/strength-bar/strength-bar.component';
import {StrengthBarService} from './services/strength-bar.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { fakeBackendProvider } from './models/strength-bar-backend-mock.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    StrengthBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [StrengthBarService, fakeBackendProvider],
  bootstrap: [AppComponent]
})

export class AppModule { }
