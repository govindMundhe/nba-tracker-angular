import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  id!: string;
  results:[] = [];
  loading: boolean = false;
  team!: Team
  constructor(private route: ActivatedRoute, private apiService : ApiService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.trackTeam(this.id);
    this.getTeamDetails(this.id);
  }

  getTeamDetails(id:string){
    this.loading = true;
    this.apiService.getSpecificTeam(id).subscribe((res)=> this.team = res);
  }

  trackTeam(id: string) {
    this.loading =true
    this.apiService.getGames(id).subscribe(
      (res) => {this.results = res.data; console.log(this.results)},
      (err) => console.log(err),
      () => {this.loading = false}
    );
  }
}
