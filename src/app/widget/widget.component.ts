import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { ProjectService } from '../project.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  imports: [CommonModule, MatCardModule, NgApexchartsModule]
})
export class WidgetComponent implements OnInit {
  @Input() type!: string;
  // @Input() projectId!: number;
  @Input() project!: any;
  @Output() remove = new EventEmitter<void>();

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: ChartOptions;

  tasksCompleted: number;
  tasksTotal: number;

  constructor(
    private projectService: ProjectService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Progress",
          data: []
        }
      ],
      chart: {
        type: "bar"
      },
      title: {
        text: "Прогресс выполнения"
      },
      xaxis: {
        categories: ["Выполнено", "Всего задач"]
      }
    };
  }

  ngOnInit(): void {
    this.chartOptions.series[0].data = [this.project.tasksCompleted, this.project.tasksTotal];
  }

  getTitle(): string {
    switch (this.type) {
      case 'progress':
        return 'Прогресс выполнения';
      case 'tasks':
        return 'Статистика по задачам';
      case 'dates':
        return 'Срок выполнения';
      default:
        return 'Виджет';
    }
  }


}
