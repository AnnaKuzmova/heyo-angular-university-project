import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

// const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: DashboardPageComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'profile',
//         component: ProfilePageComponent,
//         canActivate: [AuthGuard],
//       },
//       {
//         path: 'group',
//         component: GroupPageComponent,
//         canActivate: [AuthGuard],
//       },
//       {
//         path: 'group/create',
//         component: CreateEditPageComponent,
//         canActivate: [AuthGuard],
//       },
//       {
//         path: 'group/edit',
//         component: CreateEditPageComponent,
//         canActivate: [AuthGuard],
//       },
//     ],
//   },
// ];

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth-module/auth-routing.module').then(
        (m) => m.AuthRountingModule
      ),
    canLoad: [],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./main/main-routing.module').then((m) => m.MainRoutingModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
