import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Result } from '../shared/interfaces/team.model';
import { ApiService } from '../shared/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  id!: string;
  results: Result[] = [];
  loading: boolean = false;
  team!: Team;
  public subscription : Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('teamCode') || '';
    this.trackTeam(this.id);
    this.getTeamDetails(this.id);
  }

  getTeamDetails(id: string) {
    this.loading = true;
    this.subscription = this.apiService.getSpecificTeam(id).subscribe((res) => (this.team = res));
  }

  trackTeam(id: string) {
    this.loading = true;
    this.subscription = this.apiService.getGames(id).subscribe(
      (res) => {
        this.results = res.data;
        console.log(this.results);
      },
      (err) => console.log(err),
      () => {
        this.loading = false;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
