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

  private loadWidget() {
    let component: Type<any>;

    // Определяем, какой компонент отобразить
    switch (this.type) {
      case 'progress':
        component = ProgressWidgetComponent;
        break;
      case 'tasks':
        component = TasksWidgetComponent;
        break;
      case 'dates':
        component = DatesWidgetComponent;
        break;
      default:
        console.error(`Неизвестный тип виджета: ${this.type}`);
        return;
    }

    // Динамически создаем компонент
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.container.createComponent(factory);

    // Передаем входные данные
    componentRef.instance.project = this.project;
  }
}
