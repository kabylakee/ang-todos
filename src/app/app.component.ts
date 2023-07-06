import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    this.httpClient.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(todos => this.todos = todos);
  }
}
