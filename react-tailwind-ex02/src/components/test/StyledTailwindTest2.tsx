import styled from 'styled-components'

const StyledDiv = styled.div`
  background-color: aquamarine;
`
// StyledTailwindTest.tsx에서와 다르게
// attrs 안에 함수 전달을 안하고 객체로만 전달했더니  className을 쓰더라도 하이라이팅에 문제 없음(정적으로 className 사용할 경우)
const StyledButton = styled.button.attrs({
  className: 'bg-blue-400',
  type: 'button',
})`
  background-color: red;
`

export default function StyledTailwindTest2() {
  return (
    <>
      <StyledDiv>아쿠아마린</StyledDiv>
      <StyledButton>Styled 버튼</StyledButton>
    </>
  )
}
