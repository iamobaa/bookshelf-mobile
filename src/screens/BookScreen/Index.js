import React from 'react';
import { Appbar, Card, Text, Button, Dialog, Portal } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { AttemptDeleteBook } from '../HomeScreen/Helper';


export default function Index({navigation, route}) {
    const book = route.params.book

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <ScrollView>
            <Card style={{ marginVertical: 10 }}>
                <Card.Cover style={{ height: 500 }} source={{ uri: book.imageUrl }} />

                <Card.Content style={{ marginVertical: 10 }}>
                    <Text variant="bodyMedium">
                        {book.summary}
                    </Text>
                </Card.Content>
                
                <Card.Actions>
                    <Button onPress={showDialog}>
                        Delete
                    </Button>
                    <Button onPress={() => navigation.navigate('UpdateBook', {book})}>
                        Edit
                    </Button>
                </Card.Actions>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure you want to delete this book?
                        </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => AttemptDeleteBook({ navigation, bookId: book.id})}>Delete</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>        
            </Card>


        </ScrollView>
    )
}
