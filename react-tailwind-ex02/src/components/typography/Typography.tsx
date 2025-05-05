import { Theme, Heading, Text, Box, Button } from '@radix-ui/themes'

export default function () {
  return (
    <>
      <Theme accentColor='blue' grayColor='gray'>
        {/* Heading, Text 요소는 accentColor, grayColor에 영향받지 않음. accentColor는 버튼처럼 상호작용이 있는 요소에 적용됨 */}
        <Heading size={'4'} color='red'>
          헤드
          <Button>ㅇ</Button>
        </Heading>
        <Text size={'4'}>텍스트</Text>
      </Theme>
    </>
  )
}
