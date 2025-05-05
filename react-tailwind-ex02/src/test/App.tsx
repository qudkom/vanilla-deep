import styles from './App.module.css'
// 최상단 컴포넌트에 radix styles.css를 import 해줘야 전역적으로 적용이 됨
import '@radix-ui/themes/styles.css'
import { Theme, Flex, Button } from '@radix-ui/themes'
import Test from '@/components/test/Test'
import Test2 from '@/components/test/Test2'
import Test3 from '@/components/test/Test3'
import Test4 from '@/components/test/Test4'
import Test5 from '@/components/test/Test5'
import StyledTailwindTest from '@/components/test/StyledTailwindTest'
import clsx from 'clsx'

// 사용법 테스트
export default function App() {
  return (
    <>
      {/* 간단하게 적용할 수 있는 옵션으로 accentColor, grayColor, radius 등 */}
      <Theme accentColor='crimson'>
        {/* 충돌 테스트1, 충돌 테스트 2에서 styles.test를 어디에 쓰나 styles.test가 적용되는걸 보면 무조건 .module.css가 우선됨 */}
        <div className={clsx(styles.test, 'bg-green-900', 'hover:bg-blue-500', 'text-red-800')}>tailwind tsx, module.css 스타일 충돌 테스트1</div>
        <div className={clsx('bg-green-900', 'hover:bg-blue-500', 'text-red-800', styles.test)}>
          {/* .module.css에서 작성한 tailwind 클래스와, .tsx에서  직접 작성한 tailwind class가 같은 속성에 대한 것일 경우 .module.css의 스타일만 적용됨.
            .module.css에서 그냥 bg 에 대한 것만 작성했는데 .tsx에서 작성한 것은 bg뿐 아니라 hover:bg도 적용 안됨
            bg와 별도 속성인 text는 적용됨
          */}
          tailwind tsx, module.css 스타일 충돌 테스트2
          {/* module.css에서 계층적으로 작성한 css가 postcss를 통해 잘 적용됨 */}
          <div className={styles.inner}>module.css 계층적 스타일 적용</div>
        </div>
        {/* .tsx 내에서의 tailwind 직접 사용 */}
        <div className='bg-amber-900'>qqqq</div>
        <Flex gap='2' direction='row'>
          <Button className='text-green-600'>버튼 컴포넌트1 surface</Button>
          {/* ghost 옵션 - 테마의 스타일이 최소한으로 적용 */}
          <Button variant='ghost'>
            <button className='bg-green-900 text-red-800'>버튼 컴포넌트2 ghost</button>
          </Button>
          {/* radix 컴포넌트에 ghost 옵션을 주고 className으로 커스텀하려고 해도 컴포넌트 자체에 직접 적용 안됨 */}
          <Button variant='ghost' className={clsx('bg-green-900', 'text-blue-700', styles.test)}>
            버튼 컴포넌트3
          </Button>
        </Flex>
        <Test />
        <Test2 />
        <Test3 />
        <Test4 />
        <Test5 />
        <StyledTailwindTest />
      </Theme>
    </>
  )
}
