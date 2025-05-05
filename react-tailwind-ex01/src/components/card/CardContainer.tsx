import styles from './CardContainer.module.css'
import Card from './Card'
import imageSrc1 from './../../assets/sample-SK-LS-28mm-f-4.5.jpg'
import imageSrc2 from './../../assets/sample-SK-LS-55mm-f-2.8.jpg'
export type CardContent = {
  imgSrc?: string
  title: string
  content: string
}
const cardContents: CardContent[] = [
  {
    imgSrc: imageSrc1,
    title: '타이틀1111',
    content: '내용1111111111',
  },
  {
    imgSrc: imageSrc1 + '1',
    title: '타이틀22222',
    content: '내용222222222222222222222222222222222222222222222222222222222',
  },
  {
    imgSrc: imageSrc2,
    title: '타이틀3333',
    content: '내용33333333',
  },
  {
    imgSrc: imageSrc2,
    title: '타이틀3333',
    content: '내용33333333',
  },
  {
    imgSrc: imageSrc2,
    title: '타이틀3333',
    content: '내용33333333',
  },
  {
    imgSrc: imageSrc2,
    title: '타이틀3333',
    content: '내용33333333',
  },
  {
    imgSrc: imageSrc2,
    title: '타이틀3333',
    content: '내용33333333',
  },
  {
    title: '타이틀3333',
    content: '내용33333333',
  },
]
export default function CardContainer() {
  return (
    <>
      <div className={styles.container}>
        {cardContents.map((card) => (
          <Card {...card} />
        ))}
      </div>
    </>
  )
}
