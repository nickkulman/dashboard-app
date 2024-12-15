import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { ResizableModule } from 'angular-resizable-element';
import { Project } from '../project.service';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-progress-widget',
  templateUrl: './progress-widget.component.html',
  imports: [ NgApexchartsModule, ResizableModule ]
})
export class ProgressWidgetComponent implements OnInit {
  @Input() project!: Project;

  @ViewChild('chart') chart: ChartComponent;

  public chartOptions: ChartOptions;

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
}
