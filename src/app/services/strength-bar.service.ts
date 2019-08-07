import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';
import {IScoreObject} from '../interfaces/ScoreObject';
import {HttpClient} from '@angular/common/http';


@Injectable()
/**
 * This Class Should have http: HttpClient injected to request the backend-url this.http.get(password-strength)
 * and return an observable with the response from the server.
 * this is simulated in getCalculatedStrength that return Observable like the back-end response
 */
export class StrengthBarService {
  private url: string;
  public apiStrength: number;
  private points: number;

  constructor(private http: HttpClient ) {
    this.url = environment.apiUrl;
    this.apiStrength = 0;
    this.points = 0;
  }

  /**
   * Simlaute REST API From bBack-end server with response {statusCode, data, validationMessage}
   * incase of real backend server TODO use getCalculatedStrengthBackend()
   * Calculate strength based on provided password Simulates Backend RestAPI
   * @param {string} password
   * @returns {Observable<any>}
   */
  public getCalculatedStrength(password: string): Observable<any> {
    let response: {};
    if (password === '' || password === undefined) {
      response = {'status': 404, 'data': 0, 'message': 'Not Found'};
      return Observable.of(response);
    }
    const scoreObject: IScoreObject[] = this.buildScoreObject(password);
    const passwordStrength = this.calculateStrength(scoreObject);
    if (passwordStrength) {
      response = {'status': 200, 'data': passwordStrength, 'message': 'Successful'};
    } else {
      response = {'status': 404, 'data': passwordStrength, 'message': 'Not Found'};
    }
    return Observable.of(response);
  }

  /**
   * Should be used when Real API is ready
   * @param {string} password
   */
  // public getCalculatedStrengthBackend(password: string) {
  //   // return this.http.post(this.backendUrl, {password},{ headers });
  // }

  /**
   *
   * @param {string} password
   * @returns Object{{type: string; appearance: number; items: string[]}[]}
   */
  private buildScoreObject(password: string): IScoreObject[] {
    const specialCharRegex = new RegExp('[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]');
    const digitRegex = new RegExp('[0-9]');
    const lowerCharRegex = new RegExp('[a-z]');
    const upperCharRegex = new RegExp('[A-Z]');
    const scoreObject: IScoreObject[] = [
      {type: 'lowerCase', appearance: 0, items: [], exist: false},
      {type: 'upperCase', appearance: 0, items: [], exist: false},
      {type: 'digit', appearance: 0, items: [], exist: false},
      {type: 'specialChar', appearance: 0, items: [], exist: false},
    ];

    // convert passord to array of chars to check every single char
    password.split('').forEach((item, index) => {
      if (item.match(lowerCharRegex)) { // if (lowerCase just update scoreObject) {
        scoreObject[0].appearance++;
        scoreObject[0].exist = true;
      } else if (item.match(upperCharRegex)) { // if upperCase inc its appearance in scoreObject
        // if (!(scoreObject[1].items.join('').includes(item))) {
        // if the item is repeated don't inc appearance in scoreObject(inc when unique value found)
          scoreObject[1].appearance++;
          scoreObject[1].items.push(item);
        scoreObject[1].exist = true;
        // }
      } else if (item.match(digitRegex)) { // if digit inc its appearance in scoreObject
        // if (!(scoreObject[2].items.join('').includes(item))) {
        // if the item is repeated don't increment appearance in scoreObject (inc when unique value found)
          scoreObject[2].appearance++;
          scoreObject[2].items.push(item);
        scoreObject[2].exist = true;
        // }
      } else if (item.match(specialCharRegex)) { // if special character inc its appearance in scoreObject
        // if (!(scoreObject[3].items.join('').includes(item))) {
        // if the item is repeated don't increment appearance in scoreObject (inc when unique value found)
          scoreObject[3].appearance++;
          scoreObject[3].items.push(item);
        scoreObject[3].exist = true;
        // }
      }
    });
    console.log('my score obj', scoreObject);
    return scoreObject;
  }

  /**
   * Simple calculateStrength Algorithm
   * @param {Object[]} scoreObject
   * @returns {number}
   */
  private calculateStrength(scoreObject: IScoreObject[]): number {
    let points = 0;
    const special = scoreObject[3].appearance;
    const digit = scoreObject[2].appearance;
    const upper = scoreObject[1].appearance;
    const lower = scoreObject[0].appearance;

    if (scoreObject[0].exist || (lower < 4)) {
      points += 1;
      // console.log('this.points char', points);
    }

    if (scoreObject[1].exist || (upper < 4 && upper > 0)) {
      points += 2;
      // console.log('this.points char upper', points);
    }

    if (scoreObject[2].exist) {
      points += 3;
      // console.log('this.points digit', points);

    }
    if (scoreObject[3].exist) {
      points += 4;
      if (special >= 2) { // if special chars appeared mor than two times
        points += 1;
      }
      // console.log('this.points special', points);
    }

    if (points > 12) {
      points = 12;
      // console.log('this.points > 12', points);
    }

    if (lower >= 1 && upper >= 1 && digit >= 2 && special >= 2 ) {
      points = 12;
    }

    this.apiStrength = points;
    return points;
  }

}
