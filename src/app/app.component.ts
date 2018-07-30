/*
 Install the Angular CLI, if you haven't already done so.
 npm install -g @angular/cli
  
 Create a new project named angular-tour-of-heroes
 ng new angular-tour-of-heroes

 launch the application
 ng serve --open  

*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tour-of-heroes-yim';
}
