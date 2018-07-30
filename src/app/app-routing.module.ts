//ng generate module app-routing --flat --module=app
//--flat puts the file in src/app instead of its own folder.
//--module=app tells the CLI to register it in the imports array of the AppModule.

//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
const routes: Routes = [
  
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },//To make the app navigate to the dashboard automatically
{ path: 'dashboard', component: DashboardComponent },
{ path: 'heroes', component: HeroesComponent },
{ path: 'detail/:id', component: HeroDetailComponent }//The colon (:) in the path indicates that :id is a placeholder for a specific hero id
];
//Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar
//Once you've finished setting up, the router will match that URL to path: 'heroes' and display the HeroesComponent.
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)//Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by calling RouterModule.forRoot() within the imports array
  ],
  declarations: [],
  exports: [ RouterModule ]
  //Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
})
export class AppRoutingModule { }
