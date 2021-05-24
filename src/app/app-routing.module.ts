import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@feature/home/home.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'home',
    component:  HomeComponent,
    children: [
      {  
        path: '',
        loadChildren: () => import('@feature/home/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      }
    ]
  },
  { path: '', redirectTo: '/auth',  pathMatch: 'full' },
  { path: '***', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
