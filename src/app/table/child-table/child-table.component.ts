import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.scss'],
  standalone:true
})
export class ChildTableComponent {
  @Input()
  data!: { id: string; color: string; };
}
