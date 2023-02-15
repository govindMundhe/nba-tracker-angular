import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

// RxJs imports
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Result, Team } from '../interfaces/team.model';

export interface TeamResponseApi {
  data: Team[];
}

export interface ResultResponseApi {
  data: Result[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.apiKey,
    'X-RapidAPI-Host': environment.apiHost,
  });

  getTeams() {
    return <Observable<TeamResponseApi>>this.http.get(
      environment.apiUrl + '/teams',
      {
        headers: this.headers,
      }
    );
  }

  getAllDates(start: Date, end: Date) {
    for (
      var arr: string[] = [], dt: Date = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().split('T')[0]);
    }
    return arr;
  }

  getGames(id: string) {
    let data: object = {};
    let idArr: string[] = [id];
    let date : Date = new Date();
    let today : Date = new Date();
    date.setDate(date.getDate() - 12);
    let datePrev12 : Date = date;
    let dateDiff : string[] = this.getAllDates(datePrev12, today);
    let params : HttpParams = new HttpParams();
    dateDiff.forEach((date) => {
      params = params.append(decodeURIComponent('dates[]'), date);
    });
    idArr.forEach((id) => {
      params = params.append(decodeURIComponent('team_ids[]'), id);
    });

    params = params.append('per_page', 12);
    return <Observable<ResultResponseApi>>this.http.get(
      environment.apiUrl + '/games',
      {
        params: params,
        headers: this.headers,
      }
    );
  }

  getSpecificTeam(id: string) {
    return <Observable<Team>>this.http.get(
      environment.apiUrl + '/teams/' + id,
      {
        headers: this.headers,
      }
    );
  }
}
