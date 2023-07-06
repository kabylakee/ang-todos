import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";


export interface Todo {
  title: string;
  completed: boolean;
  id?: number;
}

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor(private httpClient: HttpClient) {
  }

  public addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
  }

  public fetchTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(delay(500));
  }

  public deleteTodo(id: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
