import { ToggleButton, Text, Collection, Card, View , Heading } from '@aws-amplify/ui-react'
import {
    MdFavorite
  } from 'react-icons/md';

export default function BookList({books}) {
    return(
<Collection
  items={books}
  type="list"
  direction="column"
  gap="20px"
  wrap="nowrap"
>
  {(book, index) => (
    <Card
      key={index}
      borderRadius="medium"
      maxWidth="20rem"
      variation="outlined"
    >
      <View padding="xs">
        <Heading padding="xs">{book.title}</Heading>
        <Text as="span">
              {book.description}
            </Text>

      </View>
      <ToggleButton value="bold">
        <MdFavorite />
      </ToggleButton>
    </Card>
  )}
</Collection>)

}