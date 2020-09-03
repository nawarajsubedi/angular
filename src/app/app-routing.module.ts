import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

const routes: Routes =
    [
        { path: '', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: LoginComponent },
        { path: 'dashboard', component: DasboardComponent },
        { path: 'transaction', component: TransactionComponent }
    ];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }