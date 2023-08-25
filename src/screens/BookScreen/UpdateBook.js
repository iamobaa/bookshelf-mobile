import React, { useState } from 'react';
import { Appbar, Card, Text, Button, TextInput } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { AttemptUpdateBook } from '../HomeScreen/Helper';


export default function UpdateBook({navigation, route}) {
    const Book = route.params.book
    const [Title, setTitle] = React.useState(Book.title);
    const [Author, setAuthor] = React.useState(Book.author);
    const [Summary, setSummary] = React.useState(Book.summary);
    const [ImageUrl, setImageUrl] = React.useState(Book.imageUrl);
    const [Publisher, setPublisher] = React.useState(Book.publisher);
    const [PublishDate, setPublishDate] = React.useState(Book.publishDate);

    return (
        <ScrollView>
            <View style={{ paddingBottom: 100 }}>
                <TextInput
                    label="Title"
                    value={Title}
                    onChangeText={text => setTitle(text)}
                />

                <TextInput
                    label="Author"
                    value={Author}
                    onChangeText={text => setAuthor(text)}
                />

                <TextInput
                    label="Summary"
                    value={Summary}
                    onChangeText={text => setSummary(text)}
                    multiline
                    numberOfLines={10}
                />

                <TextInput
                    label="ImageUrl"
                    value={ImageUrl}
                    onChangeText={text => setImageUrl(text)}
                />

                <TextInput
                    label="Publisher"
                    value={Publisher}
                    onChangeText={text => setPublisher(text)}
                />

                <TextInput
                    label="PublishDate"
                    value={PublishDate}
                    onChangeText={text => setPublishDate(text)}
                />

                <Button style={{ marginVertical: 20 }} 
                    mode="contained" 
                    onPress={() => AttemptUpdateBook({
                        bookId: Book.id,
                        payload: {
                            title: Title,
                            author: Author,
                            summary: Summary,
                            imageUrl: ImageUrl,
                            publisher: Publisher,
                            publishDate: PublishDate
                        },
                        navigation
                    })}
                >Update</Button>
            </View>

            
        </ScrollView>
    )
}
