//ng generate service hero

//The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source

import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES, REALHEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};//All constant variables must come at the beginning.


@Injectable({
  providedIn: 'root'//injector, which is the object that is responsible for choosing and injecting the provider where it is required. 
})//This marks the class as one that participates in the dependency injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.



export class HeroService {

  getHeroes(): Hero[] {//This function is synchronous
    return HEROES;
  }
  getObservableHeroes(): Observable<Hero[]> {//This function is asynchronous
    this.messageService.add('HeroService: fetched heroes');
    return of(REALHEROES);
  }
  getObservableHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    //Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    return of(HEROES.find(hero => hero.id === id));
  }
  constructor(private http: HttpClient,
    private messageService: MessageService) //This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  {
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/http_heroes';  // URL to web api -- http_heroes must match with whatever defined in in-memory-data.service.ts

  /** GET heroes from the server */
  getHttpHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)//All HttpClient methods return an RxJS Observable of something
      .pipe(
      tap(anyname => this.log('from tap: fetched heroes')),//looks at the observable values, does something with those values, and passes them along
      //same as tap (function(anyname){return this.log('from tap: feteched heroes');} but this will fail as this is undefined in anonymous function
      catchError(this.handleError('getHeroes', []))
      );
    //HttpClient.get returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    //To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator
  }
  /** GET hero by id. Will 404 if id not found */
  getHttpHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`from tap: fetched http hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHttpHero id=${id}`))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
