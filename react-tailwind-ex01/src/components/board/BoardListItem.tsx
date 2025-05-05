import styles from './BoardListItem.module.css'
import { Article } from './Board'
const MIN_UNIT = 1000 * 60
const HOUR_UNIT = MIN_UNIT * 60
const DAY_UNIT = HOUR_UNIT * 24
const getTimeStr = (datetime: Date) => {
  const timeDiff = new Date().getTime() - datetime.getTime()
  let timeStr: string | boolean = ''
  timeStr ||= timeDiff >= DAY_UNIT && `${datetime.getFullYear()}-${(datetime.getMonth() + 1).toString().padStart(2, '0')}-${datetime.getDay().toString().padStart(2, '0')}`
  timeStr ||= timeDiff >= HOUR_UNIT && `${Math.floor(timeDiff / HOUR_UNIT)}시간 전`
  timeStr ||= timeDiff >= MIN_UNIT && `${Math.floor(timeDiff / MIN_UNIT)}분 전`
  timeStr ||= '방금 전'
  return timeStr
}
export default function BoardListItem(article: Article) {
  const { category, title, content, author, datetime, hit } = article
  const timeStr = getTimeStr(datetime)

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.category}>{category}</td>
        <td className={styles.title}>{title}</td>
        {/* <td className={styles.content}>{content}</td> */}
        <td className={styles.author}>{author}</td>
        <td className={styles.datetime}>{timeStr}</td>
        <td className={styles.hit}>{hit}</td>
      </tr>
    </>
  )
}
