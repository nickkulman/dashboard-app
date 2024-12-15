import {
  Component,
  Input,
  Output,
  Type,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProgressWidgetComponent } from '../progress-widget/progress-widget.component';
import { TasksWidgetComponent } from '../tasks-widget/tasks-widget.component';
import { DatesWidgetComponent } from '../dates-widget/dates-widget.component';
import { WIDGET_TYPES } from '../project.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  imports: [ CommonModule, MatCardModule ]
})
export class WidgetComponent implements AfterViewInit {
  @Input() type: string;
  @Input() project: any;
  @Output() remove = new EventEmitter<void>();

  @ViewChild('id', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    console.log(this.container);
    this.loadWidget();
  }

  private loadWidget() {
    let component: Type<any>;

    // Определяем, какой компонент отобразить
    switch (this.type) {
      case WIDGET_TYPES.PROGRESS:
        component = ProgressWidgetComponent;
        break;
      case WIDGET_TYPES.TASKS:
        component = TasksWidgetComponent;
        break;
      case WIDGET_TYPES.DATES:
        component = DatesWidgetComponent;
        break;
      default:
        console.error(`Неизвестный тип виджета: ${this.type}`);
        return;
    }

    // Динамически создаем компонент
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.container.createComponent(factory);

    // Передаем в компонент входные данные
    componentRef.instance.project = this.project;
  }
}
