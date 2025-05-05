import './Test4.css'
// import styles from './Test4.css' -> 에러남
// .module.css가 아닌 그냥 .css에서는 styles로 갖다 쓸 수가 없다.
export default function Test4() {
  return (
    <>
      {/* <div className={styles.test4}>테스트4</div> */}
      <div className='test4'>테스트4</div>
    </>
  )
}
