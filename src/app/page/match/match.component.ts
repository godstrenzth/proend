import { AdnTournament } from '@adonsio/adn-tournament/lib/declarations/interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {
  @Input() match: any

}
