import { Text, Collection, Card, View , Heading } from '@aws-amplify/ui-react'


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
        <Heading padding="medium">{book.title}</Heading>
        <Text as="span">
              {book.description}
            </Text>
      </View>
    </Card>
  )}
</Collection>)

}