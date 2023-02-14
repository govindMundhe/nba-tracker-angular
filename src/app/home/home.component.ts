import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teams: [] = [];
  selectedTeam: String = 'Select Team';
  selectedTeamsArr: Team[] = [];
  loading : boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    let selectedTeams: string | null = window.sessionStorage.getItem('selectedTeams') ? (window.sessionStorage.getItem('selectedTeams')) : ''
    if(selectedTeams){
      this.selectedTeamsArr = JSON.parse(selectedTeams)
    }
    console.log(this.selectedTeamsArr);
    this.getTeams();
  }

  getTeams() {
    this.loading = true
    this.apiService.getTeams().subscribe((res) => {
      this.teams = res.data;
    },
    (err)=>{
      console.log(err)
    },
    ()=>{
      this.loading = false
    });
  }

  trackTeam() {
    this.loading = true;
    let selectedTeam = this.selectedTeam;
    let selectedTeamArr = this.teams.filter(function (o) {
      return o['id'] == selectedTeam;
    })[0]
    if (!this.selectedTeamsArr.includes(selectedTeamArr)) {
      this.selectedTeamsArr.push(
        selectedTeamArr
      );
    }
    console.log(typeof(this.selectedTeamsArr));
    window.sessionStorage.setItem("selectedTeams", JSON.stringify(this.selectedTeamsArr));
    this.loading = false;
  }

  removeTeam(team: Team) {
    this.loading = true;
    let indexOfteam: number = this.selectedTeamsArr.indexOf(team);
    this.selectedTeamsArr.splice(indexOfteam, 1);
    window.sessionStorage.setItem("selectedTeams", JSON.stringify(this.selectedTeamsArr));
    this.loading = false;
  }
}
