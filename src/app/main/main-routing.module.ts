import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditPageComponent } from './pages/create-edit-page/create-edit-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'group', 
        component: GroupPageComponent,
      },
      {
        path: 'group/create',
        component: CreateEditPageComponent,
      },
      {
        path: 'group/edit',
        component: CreateEditPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
