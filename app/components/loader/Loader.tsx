import styles from './Loader.module.css';
export const Loader = () => {
  return (
    <div className='flex h-[100%] items-center justify-center'>
      <span className={styles.loader}></span>
    </div>
  );
};
