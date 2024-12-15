import { Component, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../widget/widget.component';
import { ProjectService, Project, Widget, WidgetByProject } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ CommonModule, WidgetComponent, DragDropModule ]
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  widgetsByProject: WidgetByProject = {};

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();

    // Инициализируем виджеты для каждого проекта
    this.projects.forEach(project => {
      this.widgetsByProject[project.id] = this.loadWidgetsForProject(project.id);
    });
  }

  dragWidget(event: CdkDragDrop<any[]>, projectId: number) {
    moveItemInArray(this.widgetsByProject[projectId], event.previousIndex, event.currentIndex);
    this.saveWidgetsForProject(projectId);
  }

  addWidget(type: string, projectId: number) {
    this.widgetsByProject[projectId].push({ type });
    this.saveWidgetsForProject(projectId);
  }

  removeWidget(index: number, projectId: number) {
    this.widgetsByProject[projectId].splice(index, 1);
    this.saveWidgetsForProject(projectId);
  }

  saveWidgetsForProject(projectId: number, widgets?: Widget[]): void {
    const widgetsToSave = widgets ?? this.widgetsByProject[projectId];
    localStorage.setItem(`widgets_project_${projectId}`, JSON.stringify(widgetsToSave));
  }

  loadWidgetsForProject(projectId: number): Widget[] {
    const savedWidgets = localStorage.getItem(`widgets_project_${projectId}`);
    console.log(`Project ${projectId} widgets from localStorage:`, savedWidgets);

    if (savedWidgets) {
      return JSON.parse(savedWidgets);
    }

    // Если данных нет, при инициализации возвращаем дефолтные виджеты
    const defaultWidgets = [
      { type: 'progress' },
      { type: 'tasks' },
      { type: 'dates' }
    ];
    this.saveWidgetsForProject(projectId, defaultWidgets); // Сохраняем дефолтные виджеты в localStorage

    return defaultWidgets;
  }
}
