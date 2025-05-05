import { Theme, Text, Avatar, Flex, Card, Box, Link } from '@radix-ui/themes'
import AvatarImage from '@assets/photo-1521119989659-a83eee488004.jpg'
const person = {
  // image: 'react-tailwind-ex02\\src\\assets\\photo-1521119989659-a83eee488004.jpg', vs code는 인식을 하는데 브라우저에서는 안보임
  image: AvatarImage,
  name: '이름',
}

export default function () {
  return (
    <>
      <Theme scaling='100%'>
        <Card variant='surface'>
          <Flex gap='3' align='center'>
            <Avatar size='3' src={person.image} fallback={person.name} />
            <Box>
              <Text as='div' size='2' weight='bold'>
                {person.name}
              </Text>
              <Text as='div' size='2' color='gray'>
                Approved invoice <Link>#3461</Link>
              </Text>
            </Box>
          </Flex>
        </Card>
      </Theme>
    </>
  )
}
