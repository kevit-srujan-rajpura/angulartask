import { Component } from '@angular/core';

interface TaskItem {
  id: number;
  name: string;
  isEdit?: boolean;
  displayIcons?: boolean;
  // its optional bcz its only useful for edit operation & hover effect
}

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent {
  list: TaskItem[] = [];
  newItem = '';
  item!: TaskItem;
  i!: number;
  // will not null or undefined

  addTask(item: string): void {
    if (this.newItem.trim() === '') {
      alert('Enter a valid Task');
    } else {
      this.list.push({ id: this.list.length, name: item });
    }
    this.newItem = ''; // Clear input field
  }

  removeTask(index: number): void {
    this.list.splice(index, 1);
  }

  editTask(task: TaskItem): void {
    this.list.forEach((item) => (item.isEdit = false)); // multiple edit not open
    task.isEdit = true; // edit enable
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
