import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppURL } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SendjobComponent } from './components/sendjob/sendjob/sendjob.component';


const RouteLists: Routes = [   
    { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
    { path: AppURL.Login, component: LoginComponent },    
    { path: AppURL.Register, component: RegisterComponent },    
    { path: AppURL.Sendjob, component: SendjobComponent },    
    //{ path: AppURL.Authen, loadChildren:'./authentication/authentication.module#AuthenticationModule'},//สำหรับ Angular 6
    { path: AppURL.Authen, loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(RouteLists)],
    exports: [RouterModule]
  })

export class AppRoutingModule  {};