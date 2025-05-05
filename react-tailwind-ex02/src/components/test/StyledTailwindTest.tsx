import styled from 'styled-components'

// 기본적인 styed 컴포넌트 사용
const StyledDiv = styled.div`
  background-color: aquamarine;
`

// styled-component를 사용하면서 attrs에 함수를 사용하여 className을 지정해주면 vs코드의 하이라이팅이 적용이 안된다는 문제가 있음(에러는 없음)
// StyledTailwindTest2 처럼 attrs 안에 함수 안쓰고 객체로 정보를 넘기면 하이라이팅 적용됨
// StyledDiv2, StyledDiv3를 제거하고 위의 StyledDiv만 남기면 하이라이팅이 적용됨
const StyledDiv2 = styled.div.attrs(() => ({
  className: 'bg-blue-500',
}))`
  background-color: aqua;
`

const StyledDiv3 = styled.div.attrs<{ name: string }>(({ name }) => ({
  className: name,
}))`
  background-color: aliceblue;
`

export default function StyledTailwindTest() {
  return (
    <>
      <StyledDiv>아쿠아마린</StyledDiv>
      <StyledDiv2>styled 컴포넌트+tailwind</StyledDiv2>
      <StyledDiv3 name='bg-blue-200'>styled 컴포넌트+tailwind2</StyledDiv3>
    </>
  )
}
