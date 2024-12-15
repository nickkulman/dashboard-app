import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  tasksCompleted: number;
  tasksTotal: number;
  startDate: string;
  endDate: string;
}

export interface Widget {
  type: string;
}

export interface WidgetByProject {
  [projectId: number]: Widget[];
}

export enum WIDGET_TYPES {
  PROGRESS = 'Прогресс выполнения',
  TASKS = 'Статистика по задачам',
  DATES = 'Срок выполнения'
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects = [
    { id: 1, name: 'Проект A', tasksCompleted: 25, tasksTotal: 100, startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 2, name: 'Проект B', tasksCompleted: 75, tasksTotal: 140, startDate: '2023-06-01', endDate: '2024-03-31' },
    { id: 3, name: 'Проект C', tasksCompleted: 80, tasksTotal: 85, startDate: '2024-06-01', endDate: '2024-09-31' }
  ];

  getProjects() {
    return this.projects;
  }

  getProjectById(id: number) {
    return this.projects.find(project => project.id === id);
  }
}
