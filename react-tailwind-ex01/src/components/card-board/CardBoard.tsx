import dayjs, { Dayjs } from 'dayjs'
import styles from './CardBoard.module.css'
import CardListItem from './CardListItem'
export type CardContent = {
  categoryCd: CategoryType
  title: string
  content: string
  imgSrc: string
  author: string
  datetime: Dayjs
  hit: number
  commentCnt: number
  likeCount: number
  clickedLike: boolean
}
const MIN = 1000 * 60
const HOUR = MIN * 60
const DAY = HOUR * 24
export type TimeDisplay = {
  label: string
  icon: 'bolt' | ''
}
export type CategoryDisplay = {
  label: string
  type: 'fight' | 'cold' | ''
}
export type HitDisplay = {
  label: string
  type: 'fire' | ''
}
export type LikeDisplay = {
  clicked: boolean
  hot: boolean
}
type CategoryType = '00' | '01' | '02' | '03'
const getTimeDisplay = (baseTime: Dayjs, compareTime: Dayjs): TimeDisplay => {
  const diff = baseTime.diff(compareTime)
  if (MIN > diff) {
    return {
      label: '방금 전',
      icon: 'bolt',
    }
  }
  if (HOUR > diff) {
    return {
      label: `${Math.floor(diff / MIN)}분 전`,
      icon: 'bolt',
    }
  }
  if (DAY > diff) {
    return {
      label: `${Math.floor(diff / HOUR)}시간 전`,
      icon: 'bolt',
    }
  }
  if (compareTime.year() === baseTime.year()) {
    return {
      label: compareTime.format('MM-DD'),
      icon: '',
    }
  }
  return {
    label: compareTime.format('YYYY-MM-DD'),
    icon: '',
  }
}
const getCategoryDisplay = (categoryCd: CategoryType): CategoryDisplay => {
  const categoryMap: Record<CategoryType, CategoryDisplay> = {
    ['00']: { label: '토론', type: 'fight' },
    ['01']: { label: 'VS', type: 'fight' },
    ['02']: { label: '잠담', type: 'cold' },
    ['03']: { label: '일상', type: '' },
  }
  return categoryMap[categoryCd || '03']
}
const getHitDisplay = (hit: number): HitDisplay => {
  const units = ['', 'k', 'm', 'b']
  let cut = 1000
  let unitIdx = 0
  while (hit >= cut && unitIdx < units.length - 1) {
    cut *= 1000
    ++unitIdx
  }
  const label = (hit / (cut / 1000)).toFixed(1).replace(/\.?0+$/, '') + units[unitIdx]
  return { label, type: unitIdx > 0 ? 'fire' : '' }
}
const getLikeDisplay = (likeCount: number, clicked: boolean): LikeDisplay => {
  return {
    hot: likeCount >= 10,
    clicked,
  }
}
const contents: CardContent[] = [
  {
    author: '이병건',
    categoryCd: '00',
    title:
      '제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-10, 'second'),
    hit: 100,
    commentCnt: 10,
    likeCount: 0,
    clickedLike: false,
  },
  {
    author: '이병건',
    categoryCd: '00',
    title:
      '제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-10, 'second'),
    hit: 1001,
    commentCnt: 10,
    likeCount: 5,
    clickedLike: true,
  },
  {
    author: '이병건',
    categoryCd: '01',
    title: '제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-10, 'minute'),
    hit: 1490,
    commentCnt: 0,
    likeCount: 10,
    clickedLike: false,
  },
  {
    author: '이병건',
    categoryCd: '02',
    title: '제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-100, 'minute'),
    hit: 10010,
    commentCnt: 0,
    likeCount: 20,
    clickedLike: false,
  },
  {
    author: '이병건',
    categoryCd: '03',
    title: '제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-24, 'hour'),
    hit: 10010010,
    commentCnt: 0,
    likeCount: 15,
    clickedLike: true,
  },
  {
    author: '이병건',
    categoryCd: '03',
    title: '제목111111111114111111왜 여기 안보이냐',
    content: '내용1111111111111111a14111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-24, 'hour'),
    hit: 10010010000,
    commentCnt: 0,
    likeCount: 0,
    clickedLike: false,
  },
  {
    author: '이병건',
    categoryCd: '03',
    title:
      '제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111제목11111111111111111',
    content: '내용11111111111111111111111111111111',
    imgSrc: 'https://blog.kakaocdn.net/dn/bCWuqt/btsGVgVRJ7n/17pdAenKefKd4YJUYhzwU1/img.png',
    datetime: dayjs(new Date()).add(-1, 'year'),
    hit: 100,
    commentCnt: 0,
    likeCount: 0,
    clickedLike: false,
  },
]
export default function CardBoard() {
  const baseTime = dayjs()
  return (
    <>
      <div className={styles.cardBoard}>
        {contents.map((row) => (
          <CardListItem
            cardContent={{ ...row }}
            categoryDisplay={getCategoryDisplay(row.categoryCd)}
            timeDisplay={getTimeDisplay(baseTime, row.datetime)}
            hitDisplay={getHitDisplay(row.hit)}
            likeDisplay={getLikeDisplay(row.likeCount, row.clickedLike)}
          />
        ))}
      </div>
    </>
  )
}
