import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DefaultTaskRealisation } from './types-of-task-realisation/default-task-realisation/default-task-realisation';
import { ApdatingProcessTaskRealisation } from './types-of-task-realisation/apdating-process-task-realisation/apdating-process-task-realisation';

export const FullTaskInformation = ({ task, tasks, setTasks }) => {
	const [actualToDoValue, setActualToDoValue] = useState(task.value);
	const [IsToDoInModificationProcess, setIsToDoInModificationProcess] = useState(false);

	const navigate = useNavigate();

	return !IsToDoInModificationProcess ? (
		<DefaultTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			toDoId={task.id}
			tasksForDefault={tasks}
			setTasksForDefault={setTasks}
		/>
	) : (
		<ApdatingProcessTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setCurrentToDoValue={setActualToDoValue}
			toDoId={task.id}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			tasksForUpdate={tasks}
			setTasksForUpdate={setTasks}

		/>
	);
};

/*

*/
