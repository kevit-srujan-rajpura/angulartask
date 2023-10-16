import { Component } from '@angular/core';
import Swal from 'sweetalert2';

interface TaskItem {
  id: number;
  name: string;
  isEdit?: boolean;
  displayIcons?: boolean;
  
}
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent {
  tasklist: TaskItem[] = [];
  newItem = '';
  item!: TaskItem;
  indexoftasklist!: number;
  // will not null or undefined
  addTask(item: string): void {
    if (this.newItem.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid task!',
      })
      return;
    }
    this.tasklist.push({ id: this.tasklist.length, name: item });
    this.newItem = ''; // Clear input field
  }
  removeTask(index: number): void {



    Swal.fire({
      title: 'Are you sure !',
      text: "You want to delete this task ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasklist.splice(index, 1);
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      }
    })

  }
  async editTask(task: TaskItem): Promise<void> {
    this.tasklist.forEach((item) => (item.isEdit = false)); // multiple edit not open
    task.isEdit = true; 

  }

  updateTask(task: TaskItem): void {
    task.isEdit = false; // after key event edit is disabled
  }

  showIcons(task: TaskItem): void {
    task.displayIcons = true; // shows icon on hover
  }

  removeIcons(task: TaskItem): void {
    task.displayIcons = false; // removes icons
  }
}
