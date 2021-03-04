import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent {
	// two way data-binding for item
	@Input() item: Task;
	@Output() itemChange = new EventEmitter<Task>();

	// event emitter to delete an item
	@Output() delete = new EventEmitter<void>();

	constructor(private taskService: TaskService) {}

	onDelete() {
		this.delete.emit();
	}

	async onClickItem() {
		try {
			this.item.completed = !this.item.completed;
			await this.taskService.updateTask(this.item).toPromise();
			this.itemChange.emit(this.item);
		} catch (err) {

		}
	}
}
