import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	list: Task[] = [];

	constructor(public taskService: TaskService) {

	}

	ngOnInit() {
		this.taskService.getTasks().subscribe(
			res => {
				this.list = res.map(({'_id': id, text, completed}) => ({
					id, text, completed
				}))
			}
		)
	}

	async onAddItem(input: HTMLInputElement) {
		try {
			if (input.value) {
				const {'_id': id, text, completed} =
					await this.taskService.addTask({
						text: input.value,
						completed: false
					}).toPromise();
				this.list.push({id, text, completed});
				input.value = '';
				input.focus();
			}
		} catch (err) {

		}
	}

	async onDeleteItem(idx: number) {
		try {
			await this.taskService.deleteTask(this.list[idx]).toPromise();
			this.list = this.list.filter((el: Task, i: number) => i !== idx);
		} catch (err) {

		}
	}

	async onDeleteCompletedItems() {
		try {
			await this.taskService.deleteCompletedTasks().toPromise();
			this.list = this.list.filter((el: Task) => !el.completed);
		} catch (err) {

		}
	}
}
