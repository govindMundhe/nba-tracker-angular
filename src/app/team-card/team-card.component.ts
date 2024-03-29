import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Result, Team } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit, OnDestroy {
  @Input() team!: Team;
  @Output() removeTeam = new EventEmitter<Team>()
  results!: Result[];
  avgPoints: number = 0;
  avgPointsOpp: number = 0;
  loading : boolean = false;
  public subscription : Subscription = new Subscription();
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.trackTeam(this.team.id);
  }

  trackTeam(id: string) {
    this.loading =true
    this.subscription =this.apiService.getGames(id).subscribe(
      (res) => (this.results = res.data),
      (err) => console.log(err),
      () => {this.checkWinner(id, this.results)
      this.loading = false}
    );
  }

  calcAvg(arr: number[]) {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  checkWinner(id: string, results: Result[]) {
    let teamPoints: number[] = [];
    let oppPoints: number[] = [];
    results.forEach((result) => {
      if (result.home_team.id === id) {
        teamPoints.push(result.home_team_score);
        oppPoints.push(result.visitor_team_score);
        if (result.home_team_score > result.visitor_team_score) {
          result.winStatus=  'W';
        } else {
          result.winStatus=  'L';
        }
      } else if (result.visitor_team.id === id) {
        teamPoints.push(result.visitor_team_score);
        oppPoints.push(result.home_team_score);
        if (result.home_team_score < result.visitor_team_score) {
          result.winStatus= 'W';
        } else {
          result.winStatus= 'L';
        }
      }
    });
    this.avgPoints = this.calcAvg(teamPoints);
    this.avgPointsOpp = this.calcAvg(oppPoints);
    this.loading = false;

    return results;
  }

  removeSection(team: Team){
    this.removeTeam.emit(team);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
