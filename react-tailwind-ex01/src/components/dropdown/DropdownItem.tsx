import styles from './DropdownItem.module.css'
import { MenuItem } from './DropdownNav'
import styled from 'styled-components'

const Item = styled.li<{ zIdx: number; depth: number }>`
  position: relative;
  &:hover {
    background-color: red;
    z-index: ${({ zIdx }) => zIdx};
    & > ul {
      display: ${({ depth }) => (depth % 2 === 0 ? 'flex' : 'block')};
      position: absolute;
      top: ${({ depth }) => (depth % 2 === 0 ? 0 : '100%')};
      left: ${({ depth }) => (depth % 2 === 0 ? '100%' : 0)};
      background-color: blue;
      max-width: 200px;
      white-space: nowrap;
    }
  }
  ul {
    display: none;
  }
`
export default function DropdownItem({ text, children, depth, zIdx }: MenuItem & { depth: number; zIdx: number }) {
  return (
    <>
      <Item depth={depth} zIdx={zIdx}>
        {text}
        {children && (
          <ul>
            {children.map((item) => (
              <DropdownItem text={item.text} children={item.children} depth={depth + 1} zIdx={zIdx + 1} />
            ))}
          </ul>
        )}
      </Item>
    </>
  )
}
