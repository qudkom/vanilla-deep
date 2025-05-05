import styles from './Test2.module.css'
// .module.css와  .tsx의 파일명을 맞춰놓는건 개발편의상, 관례적인 의미?. 안맞아도 에러 없음.
export default function Test3() {
  return (
    <>
      <div className={styles.test2}>테스트3</div>
    </>
  )
}
