import { Button, Theme } from '@radix-ui/themes'
export default function () {
  return (
    <>
      {/* 적용 안됨 */}
      <Button className='bg-amber-500'>버튼1</Button>
      {/* style을 직접 주는건 적용됨 */}
      <Button style={{ backgroundColor: 'red' }}>버튼2</Button>
      {/* color 속성을 주는건 적용됨 */}
      <Button color='red'>버튼3</Button>
      <Button
        onClick={() => {
          console.log('테스트')
        }}
      >
        {/* 테마를 통해서 스타일을 정하는게 기본이라 그런듯 */}
        <Theme>
          <Button>버튼4</Button>
        </Theme>

        <button className='bg-blue-800'>버튼5</button>
      </Button>
    </>
  )
}
