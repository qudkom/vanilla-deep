import styles from './DropdownNav.module.css'
import DropdownItem from './DropdownItem'

export type MenuItem = { text: string; children?: MenuItem[] }
export default function DropdownNav() {
  const menu: MenuItem[] = [
    {
      text: '메뉴1',
    },
    {
      text: '메뉴2',
      children: [{ text: '메뉴2-1' }, { text: '메뉴2-2' }],
    },
    {
      text: '메뉴3',
      children: [
        { text: '메뉴3-1' },
        {
          text: '메뉴3-2',
          children: [{ text: '메뉴3-2-1' }, { text: '메뉴3-2-2      .', children: [{ text: '메뉴3-2-2-1' }] }],
        },
        { text: '메뉴3-3', children: [{ text: '메뉴3-3-1' }] },
      ],
    },
  ]

  const ROOT_Z_INDEX = 1
  const ROOT_DEPTH = 1
  return (
    <>
      <nav className={styles.dropdown}>
        <ul className={styles.dropdownList}>
          {menu.map((item) => (
            <DropdownItem text={item.text} children={item.children} depth={ROOT_DEPTH} zIdx={ROOT_Z_INDEX} />
          ))}
        </ul>
      </nav>
    </>
  )
}
