import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComputersupplyComponent } from './components/computersupply/computersupply.component';
import { ItassetsComponent } from './components/itassets/itassets.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleMember } from '../services/member.service';



const RouteLists: Routes = [   
    { path:'', redirectTo:AuthURL.Dashboard, component:DashboardComponent},
    { path:AuthURL.Dashboard, component:DashboardComponent, 
      data: { roles: [IRoleMember.Member, IRoleMember.Administrator] },
      canActivate: [UserRoleGuard]
    },    
    { path:AuthURL.Computersupply,
      data: { roles: [IRoleMember.Administrator] },
      canActivate: [UserRoleGuard],      
      children:[
      {path:'', component:ComputersupplyComponent},
      {path:':id',component:ComputersupplyComponent}
    ]},
    { path:AuthURL.Itassets, component:ItassetsComponent, 
      data: { roles: [IRoleMember.Administrator] },
      canActivate: [UserRoleGuard]
    }    
    ];

@NgModule({
    imports: [RouterModule.forChild(RouteLists)],
    exports: [RouterModule]
  })

export class AuthenticationRoutingModule  {};

