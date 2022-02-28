import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth-module/AuthModule';
import { ComponentsModule } from '../components-module/ComponentsModule';
import { MainRoutingModule } from './main-routing.module';
import { CreateEditPageComponent } from './pages/create-edit-page/create-edit-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    DashboardPageComponent,
    GroupPageComponent,
    CreateEditPageComponent,
  ],
  imports: [
    MainRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    AuthModule,
    ComponentsModule,
  ],
  exports: [],
  bootstrap: [DashboardPageComponent],
})
export class MainModule {}
