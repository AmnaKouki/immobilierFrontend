import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TruncatePipe } from './truncate.pipe';
import { AnnonceComponent } from './annonce/annonce.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { LightboxModule } from 'ngx-lightbox';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
// add form module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { CreateAnnonceComponent } from './create-annonce/create-annonce.component';
import { UpdateAnnonceComponent } from './update-annonce/update-annonce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EmptyComponent } from './components/empty/empty.component';
import { TableModule } from 'primeng/table';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    TruncatePipe,
    AnnonceComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    AdminComponent,
    NotFoundComponent,
    TableActionsComponent,
    CreateAnnonceComponent,
    UpdateAnnonceComponent,
    EmptyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CarouselModule,
    LightboxModule,
    FormsModule,
    AgGridAngular,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    EditorModule,
    InputNumberModule,
    MultiSelectModule,
    FileUploadModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    ProgressSpinnerModule,
    TableModule,
    GalleriaModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string | null => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [MessageService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
