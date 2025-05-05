// tailwind tsx 적용 테스트용
// root tsx 파일인 main.tsx에서 index.css를 import 하고
// index.css 안에 import tailwind 해주면 모든 .tsx에서 tailwind 사용 가능해짐
export default function Test() {
  return (
    <>
      <div className='bg-gray-700'>테스트</div>
    </>
  )
}
