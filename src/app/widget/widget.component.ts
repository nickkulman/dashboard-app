import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

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
  @Input() project!: any;
  @Output() remove = new EventEmitter<void>();

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: ChartOptions;

  tasksCompleted: number;
  tasksTotal: number;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Tasks progress",
          data: []
        }
      ],
      chart: {
        type: "bar"
      },
      title: {
        text: "Задачи"
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
        return '';
    }
  }
}
