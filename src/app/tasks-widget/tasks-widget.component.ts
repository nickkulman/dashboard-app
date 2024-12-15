import { Component, Input } from '@angular/core';
import { Project } from '../project.service';

@Component({
  selector: 'app-tasks-widget',
  templateUrl: './tasks-widget.component.html'
})
export class TasksWidgetComponent {
  @Input() project!: Project;
}
