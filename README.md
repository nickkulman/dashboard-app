Приложение Дашборд для управления проектами с настраиваемыми виджетами.

Каждый виджет отображает информацию о проекте: 
Прогресс выполнения в виде прогресс-бара,
Статистика по задачам (количество завершённых/оставшихся задач),
Даты начала и завершения проекта.

Для реализации прогресс-бара используется библиотека ApexCharts.

Релизовано сохранение настроек дашборда в LocalStorage (расположение виджетов, их размер, выбранные типы виджетов). 
При перезагрузке страницы дашборд восстанавливает состояние пользователя (то есть все настройки виджетов сохраняются). 

Для изменения порядка и расположения виджетов реализована drag-and-drop функциональность, использована библиотека @angular/cdk/drag-drop. 

Для создания UI использована библиотека Angular Material.

Моковые данные для проектов: project.service.ts (эмуляция загрузки данных о проектах с сервера).


# DashboardApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
