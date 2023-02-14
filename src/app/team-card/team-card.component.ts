import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() team!: Team;
  @Output() removeTeam = new EventEmitter<Team>()
  results!: [];
  avgPoints: number = 0;
  avgPointsOpp: number = 0;
  loading : boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.trackTeam(this.team.id);
  }

  trackTeam(id: string) {
    this.loading =true
    this.apiService.getGames(id).subscribe(
      (res) => (this.results = res.data),
      (err) => console.log(err),
      () => {this.checkWinner(id, this.results)
      this.loading = false}
    );
  }

  calcAvg(arr: number[]) {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  checkWinner(id: string, results: []) {
    let teamPoints: [] = [];
    let oppPoints: [] = [];
    results.forEach((result) => {
      if (result['home_team']['id'] === id) {
        teamPoints.push(result['home_team_score']);
        oppPoints.push(result['visitor_team_score']);
        if (result['home_team_score'] > result['visitor_team_score']) {
          Object.assign(result, { winStatus: 'W' });
        } else {
          Object.assign(result, { winStatus: 'L' });
        }
      } else if (result['visitor_team']['id'] === id) {
        teamPoints.push(result['visitor_team_score']);
        oppPoints.push(result['home_team_score']);
        if (result['home_team_score'] < result['visitor_team_score']) {
          Object.assign(result, { winStatus: 'W' });
        } else {
          Object.assign(result, { winStatus: 'L' });
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
}
