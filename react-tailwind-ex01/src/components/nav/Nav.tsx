import './Nav.module.css'
import Item from './NavItem'
import styles from './Nav.module.css'
export default function Nav() {
  const items = [{ text: '아이템1' }, { text: '아이템2' }]
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          {items.map((item) => (
            <Item text={item.text} />
          ))}
        </ul>
      </nav>
    </>
  )
}
