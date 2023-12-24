import styles from './App.module.css';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ToDosSort } from './user-actions-with-todos/to-dos-sort/to-dos-sort';
import { ToDosSearch } from './user-actions-with-todos/to-dos-search/to-dos-search';
import { processUserRequestForSerchAndSort } from './help-functions/process-user-request-for-serch-and-sort';
import { ToDosListOutput } from './to-do-list-output/to-do-list-output';
import { AddToDos } from './user-actions-with-todos/add-to-dos/add-to-dos';

import { FullTaskInformation } from './full-task-information/full-task-information';
import { NotFoundPage } from './not-found-page/not-faund-page';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [fieldSearchValue, setFieldSearchValue] = useState('');
	const [isSortChecked, setIsSortChecked] = useState(false);

	useEffect(() => {
		fetch(
			`http://localhost:3004/todos${processUserRequestForSerchAndSort(
				fieldSearchValue,
				isSortChecked,
			)}`,
		)
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				console.log('loadedToDos', loadedToDos);
				setToDos(loadedToDos);
			});
	}, [fieldSearchValue, isSortChecked]);

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<div className={styles.container}>
							<div className={styles.toDosItemList}>
								<h3 className={styles.header}>Список дел на 2024 год</h3>
								<div className={styles.settings}>
									<ToDosSort checked={isSortChecked} setChecked={setIsSortChecked} />
									<ToDosSearch setConfirmedSearchValue={setFieldSearchValue} />
								</div>
								<ToDosListOutput toDosList={toDos} />
							</div>
							<AddToDos
								tasks={toDos}
								setTasks={setToDos}
							/>
						</div>
					}
				/>
					<Route
						path='/task/:id'
						element={
							<FullTaskInformation
								tasks={toDos}
								setTasks={setToDos}
							/>
						}
					/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
