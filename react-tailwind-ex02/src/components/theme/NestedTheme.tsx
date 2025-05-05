import { Theme, Button } from '@radix-ui/themes'
export default function () {
  return (
    <>
      <Theme accentColor='red'>
        <Button>테마1</Button>
        <Theme accentColor='blue'>
          <Button>테마2</Button>
        </Theme>
      </Theme>
    </>
  )
}
