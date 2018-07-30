// ng generate component heroes

import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  heroes = HEROES;
  heroes2 = [];// try this heroes: Hero[]; but failed
  observableHeroes = [];
  httpHeroes = [];

  selectedHero: Hero;
  /*= {
    id: 0,
    name: 'Yim'
  };*/
  selectedHero2: Hero;
  constructor(private heroService: HeroService) {// When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService. 

  }

  ngOnInit() {
    this.getHeroes();


    /*The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component. 
     * 
     It's a good place to put initialization logic.*/
  }

  onSelect(clicked_hero: Hero): void {
    this.selectedHero = clicked_hero;
  }
  onSelect2(clicked_hero: Hero): void {
    this.selectedHero2 = clicked_hero;
  }
  onSelect3(clicked_hero: Hero): void {
    this.heroService.getHttpHero(clicked_hero.id)
      .subscribe(incoming_hero => this.heroService.log('Hero name:' + incoming_hero.name + ' was selected.')); //function(incoming_hero){do something with incoming_hero;}
  }
  getHeroes(): void {
    this.heroes2 = this.heroService.getHeroes().slice(3, 7); // This function is synchronous
    this.heroService.getObservableHeroes().subscribe(observableHeroes => this.observableHeroes = observableHeroes);// This function is asynchronous
    this.heroService.getHttpHeroes().subscribe(httpHeroes => this.httpHeroes = httpHeroes);
  }
  save(save_hero: Hero): void {
    this.heroService.updateHero(save_hero)
      .subscribe(() => this.heroService.log(`Hero name ${save_hero.name} updated`));
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.httpHeroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.httpHeroes = this.httpHeroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
