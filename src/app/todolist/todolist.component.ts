import { Component, OnInit } from '@angular/core';
import {TodolistService} from "../shared/todolist.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: [
  ]
})
export class TodolistComponent implements OnInit {
  todos: any[] = [];
  constructor(private todolistService : TodolistService) { }

  ngOnInit(): void {
    this.todolistService.firestoreCollection.valueChanges({ idField: 'id' })
        .subscribe(item => {
          this.todos = item.sort((a:any,b:any) =>
          {return a.isDone -b.isDone } );
        })
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todolistService.addTodo(titleInput.value);
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todolistService.updateTodoStatus(id, newStatus);
  }

  onDelete(id:string){
    this.todolistService.deleteTodo(id);
  }

}
