import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team.model';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  selectedTeamsArr: Team[] = [];

  setSelectedTeams(teams: Team[]) {
    this.selectedTeamsArr = teams;
  }

  getSelectedTeam() {
    console.log(this.selectedTeamsArr);
    return this.selectedTeamsArr;
  }
}
