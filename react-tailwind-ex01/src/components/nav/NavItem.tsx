import styles from './NavItem.module.css'
export default function NavItem({ text }: { text: string }) {
  return (
    <>
      <li className={styles.item}>{text}</li>
    </>
  )
}
