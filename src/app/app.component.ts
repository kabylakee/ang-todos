import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Todo {
  title: string;
  completed: boolean;
  id?: number;
  userId?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public todos: Todo[] = [];

  constructor(private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.httpClient.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(todos => this.todos = todos);
  }
}
