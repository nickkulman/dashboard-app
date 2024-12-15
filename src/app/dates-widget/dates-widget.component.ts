import { Component, Input } from '@angular/core';
import { Project } from '../project.service';

@Component({
  selector: 'app-dates-widget',
  templateUrl: './dates-widget.component.html'
})
export class DatesWidgetComponent {
  @Input() project!: Project;
}
