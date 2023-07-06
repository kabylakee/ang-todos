import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs";
import {Todo, TodosService} from "./todos.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public todos: Todo[] = [];
  public todoTitle: string = "";
  public loading: boolean = false;

  constructor(private todosService: TodosService) {
  }

  public ngOnInit(): void {
    this.uploadTodo();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim()) {
      return;
    }

    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false,
    })
      .subscribe(todo => {
        this.todos.unshift(todo);
        this.todoTitle = "";
      });
  }

  public uploadTodo(): void {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      });
  }

  public removeTodo(id: number | undefined): void {
    this.todosService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      })
  }

  public completeTodo(id: number | undefined): void {
    this.todosService.completeTodo(id)
      .subscribe(todo => {
        this.todos.find(t => t.id === todo.id)!.completed = true;
      });
  }
}
