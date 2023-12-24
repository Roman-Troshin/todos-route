import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DefaultTaskRealisation } from './types-of-task-realisation/default-task-realisation/default-task-realisation';
import { ApdatingProcessTaskRealisation } from './types-of-task-realisation/apdating-process-task-realisation/apdating-process-task-realisation';

export const FullTaskInformation = ({ tasks, setTasks }) => {
	const params = useParams();
	const navigate = useNavigate();

	const [actualToDoValue, setActualToDoValue] = useState(null);
	const [IsToDoInModificationProcess, setIsToDoInModificationProcess] = useState(false);

	useEffect(() => {
		fetch(
			`http://localhost:3004/todos/${params.id}`
		)
			.then((loadedData) => loadedData.json())
			.then((loadedToDo) => {
				console.log('loadedToDo', loadedToDo);
				setActualToDoValue(loadedToDo.value);
			});
	}, [params.id]);




	return !IsToDoInModificationProcess ? (
		<DefaultTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			toDoId={params.id}
			tasksForDefault={tasks}
			setTasksForDefault={setTasks}
		/>
	) : (
		<ApdatingProcessTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setCurrentToDoValue={setActualToDoValue}
			toDoId={params.id}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			tasksForUpdate={tasks}
			setTasksForUpdate={setTasks}

		/>
	);
};

/*

*/
