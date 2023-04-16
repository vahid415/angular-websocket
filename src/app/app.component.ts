import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputsComponent } from './inputs/inputs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'B2Broker';
}
