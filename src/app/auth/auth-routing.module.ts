import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { CriarContaComponent } from "./criar-conta/criar-conta.component";

import { LoginComponent } from "./login/login.component";


export const HOME_ROUTE: Route = {
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
      path: 'criar-conta',
      component: CriarContaComponent,
      loadChildren: () => import('./criar-conta/criar-conta.module').then(m => m.CriarContaModule),
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ]
};

// const routes: Routes = [
//   {
//     path: "",
//     component: AuthComponent,
//     redirectTo: 'login',
//     pathMatch: 'full',
//     children: [
//       {
//         path: 'login',
//         loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
//       },
//     ]
//   },
// ];



// const routes: Routes = [
//   { path: "", component: AuthComponent },
//   { path: "login", component: LoginComponent },
//   { path: "criar-conta", component: CriarContaComponent }
// ];

@NgModule({
  imports: [
    // RouterModule.forChild(routes)
    RouterModule.forChild([HOME_ROUTE])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
