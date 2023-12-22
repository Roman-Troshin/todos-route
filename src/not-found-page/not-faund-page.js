import styles from './not-found-page.module.css';

export const NotFoundPage = () => (
	<div className={styles.mistakeContainer}>
		<div className={styles.mistakeNumber}>404</div>
		<div className={styles.mistakeText}>Page not found</div>
	</div>
);
