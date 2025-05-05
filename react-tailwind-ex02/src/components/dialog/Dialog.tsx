import { Dialog } from 'radix-ui'
import { Theme } from '@radix-ui/themes'

export default function () {
  return (
    <Dialog.Root>
      {/* **Dialog.Trigger**는 다이얼로그를 여는 트리거 역할을 하는 컴포넌트로,
      일반적으로 페이지나 부모 컴포넌트와 일관된 스타일을 유지해야 합니다. 
      그래서 외부에서 사용된 테마에 영향을 받도록 설계됩니다.
      이 컴포넌트는 다이얼로그를 여는 버튼이나 링크 등과 같이,
      페이지 내 다른 UI 요소들과 일관된 스타일을 유지하는 것이 중요합니다. */}
      <Dialog.Trigger>Open</Dialog.Trigger>
      {/* **Dialog.Portal**은 다이얼로그 콘텐츠(모달 등)를 포털로 렌더링하는 역할을 합니다.
      이 콘텐츠는 페이지에서 별도의 위치에 렌더링되기 때문에,
      다른 테마를 적용하거나 독립적으로 스타일을 다르게 설정할 필요가 있을 수 있습니다.
      예를 들어, 모달 창의 배경색을 다르게 하거나, 전체 다이얼로그의 스타일을 독립적으로 제어하고자 할 때
      Portal 내부의 스타일을 Theme로 감싸는 방식으로 별도의 테마를 적용할 수 있습니다. */}
      {/* 열었을때 body 아래 div#root와 같은 depth에 생성되고 닫으면 제거됨 */}
      <Dialog.Portal>
        {/* 포털 콘텐츠를 Theme으로 감싸 스타일 적용 */}
        <Theme>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>타이틀</Dialog.Title>
            <Dialog.Description>설명</Dialog.Description>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Theme>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
