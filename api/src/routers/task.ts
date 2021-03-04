import { Router, Request } from 'express';
import Task from '../models/task';

const router = Router();

type TaskType = {
	text: string,
	completed: boolean
}

router.get('/', async (_, res) => {
	try {
		const tasks = await Task.find();
		return res.send(tasks);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.get('/:id', async (req: Request<{id: string}>, res) => {
	try {
		const tasks = await Task.findById(req.params.id);
		return res.send(tasks);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.post('/', async (req: Request<{}, {}, TaskType>, res) => {
	try {
		const newTask = new Task({
			text: req.body.text,
			completed: req.body.completed
		});
		await newTask.save();
		return res.send(newTask);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.post('/:id', async (req: Request<{id: string}, {}, TaskType>, res) => {
	try {
		const newTask = await Task.findByIdAndUpdate(req.params.id, {
			text: req.body.text,
			completed: req.body.completed
		});
		return res.send(newTask);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.delete('/completed', async (req, res) => {
	try {
		await Task.deleteMany({ completed: true });
		return res.send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.delete('/:id', async (req: Request<{id: string}>, res) => {
	try {
		await Task.findByIdAndDelete(req.params.id);
		return res.send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

export default router;
