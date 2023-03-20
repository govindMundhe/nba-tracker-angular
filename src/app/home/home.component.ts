import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';
import { DataSharingService } from '../shared/services/data-sharing.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teams: Team[] = [];
  selectedTeam: string = 'Select Team';
  selectedTeamsArr: Team[] = [];
  loading : boolean = false;
  constructor(private apiService: ApiService, private dataSharing : DataSharingService) {}

  ngOnInit() {
    this.selectedTeamsArr = this.dataSharing.getSelectedTeam();
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
    let selectedTeam : string = this.selectedTeam;
    let selectedTeamArr:Team = this.teams.filter(function (o) {
      return o.id == selectedTeam;
    })[0]
    if (!this.selectedTeamsArr.includes(selectedTeamArr)) {
      this.selectedTeamsArr.push(
        selectedTeamArr
      );
    }
    this.dataSharing.setSelectedTeams(this.selectedTeamsArr);
    this.loading = false;
  }

  removeTeam(team: Team) {
    this.loading = true;
    let indexOfteam: number = this.selectedTeamsArr.indexOf(team);
    this.selectedTeamsArr.splice(indexOfteam, 1);
    this.dataSharing.setSelectedTeams(this.selectedTeamsArr);
    this.loading = false;
  }
}
