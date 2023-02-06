import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './access/login/login.component';
import { ComponentsModule } from "./components/components.module";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { AuthService } from './access/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    providers: [AuthService, AuthGuardService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ComponentsModule,
    ]
})
export class AppModule { }
