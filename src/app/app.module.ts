import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardPageComponent } from './main/pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './main/pages/profile-page/profile-page.component';
import { HighLightDirective } from './highlight.directive';
import { GroupPageComponent } from './main/pages/group-page/group-page.component';
import { PostComponent } from './main/components/post/post.component';
import { DeleteGroupModalComponent } from './main/components/delete-group-modal/delete-group-modal.component';
import { PreviewComponentComponent } from './main/components/preview-component/preview-component.component';
import { CreateEditPageComponent } from './main/pages/group-page/create-edit-page/create-edit-page.component';
import { ComponentsModule } from './components-module/ComponentsModule';
import { AuthModule } from './auth-module/AuthModule';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    ProfilePageComponent,
    HighLightDirective,
    GroupPageComponent,
    PostComponent,
    DeleteGroupModalComponent,
    PreviewComponentComponent,
    CreateEditPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
