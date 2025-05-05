import { Dialog } from 'radix-ui'
import { Theme, Heading, Button } from '@radix-ui/themes'

export default function () {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Theme accentColor='blue'>
          {/* Dialog.Overlay 컴포넌트를 작성해놓지 않으면 클릭했을때 dialog가 닫히게 되는 영역이 광범위해짐 */}
          {/* 태그 안에 아무것도 없거나 단일 태그로 선언하면 실질적으로 오버레이 영역이 안보이게 됨. 위와 같은 문제를 해결하기 위해서는 단일 태그로라도 작성해야 할듯? */}
          {/* <Dialog.Overlay /> */}
          {/* '오버레이' 가 보이는 영역을 클릭하면  dialog가 닫힘 */}
          <Dialog.Overlay>오버레이</Dialog.Overlay>
          {/* Dialog.Content로 아래 컴포넌트들을 감싸지 않을 경우 Overlay도 제대로 동작하지 않는다. 하지만 Trigger, Close를 통해서는 닫힘
          Dialog.Content는 Dialog의 Title, Description, Close 컴포넌트들을 감싸는 역할도 있지만 Overlay가 제대로 동작하기 위해서도 필요함 */}
          <Dialog.Content>
            <Dialog.Title>
              <Heading size={'1'}>타이틀</Heading>
            </Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Theme>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
