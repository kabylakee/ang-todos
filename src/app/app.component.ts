import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";

export interface Todo {
  title: string;
  completed: boolean;
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public todos: Todo[] = [];
  public todoTitle: string = "";
  public loading: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.uploadTodo();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false,
    }

    this.httpClient.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
      .subscribe(todo => {
        this.todos.unshift(todo);
        this.todoTitle = "";
      });
  }

  public uploadTodo(): void {
    this.loading = true;
    this.httpClient.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(delay(1500))
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      });
  }

  public removeTodo(id: number | undefined): void {
    this.httpClient.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      })
  }
}
