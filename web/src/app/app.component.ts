import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	list: Task[] = [];

	alert: {
		show: boolean,
		msg: string,
		type: 'success' | 'danger'
	} = {
		show: false,
		msg: '',
		type: 'success'
	};

	constructor(public taskService: TaskService) {

	}

	handleError(err) {
		this.alert.msg = err.message ? err.message : err;
		this.alert.type = 'danger';
		this.alert.show = true;
	}

	handleSuccess(msg: string) {
		// this.alert.msg = msg;
		// this.alert.type = 'success';
		// this.alert.show = true;
	}

	async ngOnInit() {
		try {
			const res = await this.taskService.getTasks().toPromise();
			this.list = res.map(({'_id': id, text, completed}) => ({
				id, text, completed
			}));
			this.handleSuccess('fetched tasks');
		} catch (err) {
			this.handleError(err);
		}
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
				this.handleSuccess('added task');
			}
		} catch (err) {
			this.handleError(err);
		}
	}

	async onDeleteItem(idx: number) {
		try {
			await this.taskService.deleteTask(this.list[idx]).toPromise();
			this.list = this.list.filter((el: Task, i: number) => i !== idx);
			this.handleSuccess('deleted task');
		} catch (err) {
			this.handleError(err);
		}
	}

	async onDeleteCompletedItems() {
		try {
			await this.taskService.deleteCompletedTasks().toPromise();
			this.list = this.list.filter((el: Task) => !el.completed);
			this.handleSuccess('deleted tasks');
		} catch (err) {
			this.handleError(err);
		}
	}
}
