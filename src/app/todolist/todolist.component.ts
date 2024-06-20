import { Component, OnInit } from '@angular/core';
import { TodolistService } from "../shared/todolist.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: []
})
export class TodolistComponent implements OnInit {
  todos: any[] = [];
  allCompleted: boolean = false;

  constructor(private todolistService: TodolistService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todolistService.addTodo(titleInput.value);
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todolistService.updateTodoStatus(id, newStatus);
    this.checkAllCompleted();
  }

  onEdit(item: any) {
    item.isEditing = true;
  }

  onSave(item: any) {
    this.todolistService.updateTodoTitle(item.id, item.title);
    item.isEditing = false;
  }

  onCancel(item: any) {
    item.isEditing = false;
    this.getTodos();
  }

  onDelete(id: string) {
    this.todolistService.deleteTodo(id);
  }

  getTodos(){
    this.todolistService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.sort((a: any, b: any) => { return a.isDone - b.isDone });
        this.checkAllCompleted();
      });
  }

  checkAllCompleted() {
    this.allCompleted = this.todos.length > 0 && this.todos.every(todo => todo.isDone);
  }
}
