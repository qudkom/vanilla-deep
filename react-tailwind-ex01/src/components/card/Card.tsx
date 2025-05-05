import styles from './Card.module.css'
import imageIconSrc from './../../assets/570975.png'
import { CardContent } from './CardContainer'
import { useState } from 'react'
export default function Card({ content, title, imgSrc }: CardContent) {
  const [hasError, setHasError] = useState(false)
  const fallbackSrc = imageIconSrc
  const imageSrc = imgSrc || imageIconSrc
  return (
    <>
      <div className={styles.card}>
        <img src={hasError ? fallbackSrc : imageSrc} alt='' onError={() => setHasError(true)} />
        <span className={styles.title}>{title}</span>
        <p className={styles.content}>{content}</p>
      </div>
    </>
  )
}
