import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../widget/widget.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectService, Project } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ CommonModule, WidgetComponent, DragDropModule ]
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  widgets = [
    { type: 'progress', projectId: 1 },
    { type: 'tasks',  projectId: 2 },
    { type: 'dates',  projectId: 3 }
  ];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();

    this.widgets = this.widgets.map(widget => ({
      ...widget,
      project: this.projectService.getProjectById(widget.projectId) // Получение данных проекта
    }));

    console.log('this.projects', this.projects);
    console.log('this.widgets', this.widgets);

    this.loadWidgets();
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
    this.saveWidgets();
  }

  addWidget(type: string, projectId: number) {
    this.widgets.push({ type, projectId });
    this.saveWidgets();
  }

  removeWidget(index: number) {
    this.widgets.splice(index, 1);
    this.saveWidgets();
  }

  saveWidgets() {
    localStorage.setItem('widgets', JSON.stringify(this.widgets));
  }

  loadWidgets() {
    const savedWidgets = localStorage.getItem('widgets');
    if (savedWidgets) {
      this.widgets = JSON.parse(savedWidgets);
    }
  }
}
