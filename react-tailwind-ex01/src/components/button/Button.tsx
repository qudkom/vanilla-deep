import styles from './Button.module.css'
type Color = 'red' | 'blue' | 'yellow'
export default function Button({ color }: { color: Color }) {
  const colorMap = {
    red: { cls: 'red', text: '빨간' },
    blue: { cls: 'blue', text: '파란' },
    yellow: { cls: 'yellow', text: '노란' },
  }
  const colorType = colorMap[color]
  return (
    <>
      <button className={`${styles.btn} ${styles[`${colorType.cls}`]}`}>{colorType.text} 버튼</button>
    </>
  )
}
