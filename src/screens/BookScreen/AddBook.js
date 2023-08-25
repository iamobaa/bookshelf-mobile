import React, { useState } from 'react';
import { Appbar, Card, Text, Button, TextInput } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { AttemptAddBook } from '../HomeScreen/Helper';


export default function AddBook({navigation, route}) {
    const [Title, setTitle] = React.useState("The Ballad of Songbirds and Snakes (A Hunger Games Novel)");
    const [Author, setAuthor] = React.useState("Suzanne Collins");
    const [Summary, setSummary] = React.useState("It is the morning of the reaping that will kick off the tenth annual Hunger Games. In the Capitol, eighteen-year-old Coriolanus Snow is preparing for his one shot at glory as a mentor in the Games. The once-mighty house of Snow has fallen on hard times, its fate hanging on the slender chance that Coriolanus will be able to outcharm, outwit, and outmaneuver his fellow students to mentor the winning tribute. The odds are against him. He's been given the humiliating assignment of mentoring the female tribute from District 12, the lowest of the low. Their fates are now completely intertwined -- every choice Coriolanus makes could lead to favor or failure, triumph or ruin. Inside the arena, it will be a fight to the death. Outside the arena, Coriolanus starts to feel for his doomed tribute... and must weigh his need to follow the rules against his desire to survive no matter what it takes.");
    const [ImageUrl, setImageUrl] = React.useState("https://m.media-amazon.com/images/I/61kMbMCmXIL.jpg");
    const [Publisher, setPublisher] = React.useState("Scholastic Press");
    const [PublishDate, setPublishDate] = React.useState("2020-05-19");

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
                    onPress={() => AttemptAddBook({
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
                >Submit</Button>
            </View>

            
        </ScrollView>
    )
}
