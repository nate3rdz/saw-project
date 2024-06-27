import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localStorage.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IntercomponentCommunicationService } from './services/intercomponentCommunication.service';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { TicketService } from './services/ticket.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketBarComponent } from './components/ticket-bar/ticket-bar.component';
import { TicketAnswersService } from './services/ticketAnswers.service';
import { MeService } from './services/me.service';
import { NotificationService } from './services/notification.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TicketCreateDialogComponent } from './components/ticket-create-dialog/ticket-create-dialog.component';
import { TicketsTableAdminDialogComponent } from './components/tickets-table-admin-dialog/tickets-table-admin-dialog.component';
import { EditProfileDialogComponent } from './components/edit-profile-dialog/edit-profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    TicketsTableComponent,
    TicketBarComponent,
    AdminPanelComponent,
    TicketCreateDialogComponent,
    TicketsTableAdminDialogComponent,
    EditProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService,
    LocalStorageService,
    AuthService,
    TicketService,
    TicketAnswersService,
    MeService,
    NotificationService,
    IntercomponentCommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
