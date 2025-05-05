import styles from './CardListItem.module.css'
import { CardContent, TimeDisplay, CategoryDisplay, HitDisplay, LikeDisplay } from './CardBoard'
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { BoltIcon, FireIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
export default function CardListItem({
  cardContent,
  timeDisplay,
  categoryDisplay,
  hitDisplay,
  likeDisplay,
}: {
  cardContent: CardContent
  timeDisplay: TimeDisplay
  categoryDisplay: CategoryDisplay
  hitDisplay: HitDisplay
  likeDisplay: LikeDisplay
}) {
  const { author, title, commentCnt, content, hit, imgSrc, likeCount } = cardContent
  const { icon: timeIcon, label: timeLabel } = timeDisplay
  const { label: categoryLabel, type: categoryType } = categoryDisplay
  const { label: hitLabel, type: hitType } = hitDisplay
  const { clicked, hot } = likeDisplay
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardLeft}>
            <div className={clsx(styles.category, styles[categoryType])}>{categoryLabel}</div>
            <img src={imgSrc} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.titleBox}>
              <span>
                <div className={styles.title}>
                  {hitType === 'fire' && <FireIcon className={clsx(styles.cardIcon, styles.fireIcon)} />}
                  <span className={styles.titleText}>{title}</span>
                  {commentCnt > 0 && <span>[{commentCnt}]</span>}
                </div>
              </span>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.timeDisplay}>
                {timeIcon && <BoltIcon className={clsx(styles.cardIcon, styles.timeIcon)} />}
                <span className={styles.timeLabel}>{timeLabel}</span>
              </div>
              <div className={styles.view}>
                <EyeIcon className={clsx(styles.cardIcon, styles.viewIcon)} />
                <span className={styles.hit}>{hitLabel}</span>
              </div>
              {likeCount > 0 && (
                <div className={clsx(styles.like, hot && styles.hot, clicked && styles.clicked)}>
                  <>
                    <HandThumbUpIcon className={clsx(styles.cardIcon, styles.likeIcon)} />
                    <span className={styles.likeCount}>{likeCount}</span>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
