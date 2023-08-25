import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    RefreshControl,
    Image,
    useColorScheme,
    View,
    Pressable,
} from 'react-native';
import {
    Text,
    List,
    ActivityIndicator, 
    MD2Colors, 
    MD3Colors,
    Button
} from 'react-native-paper';
import { AttemptFetchBooks } from './Helper';
  

export default function Index({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [BookList, setBookList] = useState([]) 
    const [refreshing, setRefreshing] = React.useState(false);

    const backgroundStyle = {
        // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        backgroundColor: isDarkMode ? "darkgray" : "lightgray",
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            AttemptFetchBooks({setBookList});
            setRefreshing(false);
        }, 2000);
    }, []);
    
  
    useEffect(()=> {
        //
        AttemptFetchBooks({setBookList})
    
    }, [])
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
                refreshControl={
                   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        padding: 10
                    }}
                >
                    <Text variant={"titleLarge"}>Welcome to My Bookshelf</Text>
                    <Text variant={"bodyMedium"}>These are all the available books in store. Use the button below to add more books to the shelf.</Text>
                    <Button 
                        style={{ marginVertical: 10 }} 
                        mode="contained" 
                        onPress={() => navigation.navigate('AddBook')}
                    >
                        Add Book
                    </Button>

                    {
                        BookList ? (
                            <List.Section>
                                <List.Subheader>Book List</List.Subheader>
                                
                                {
                                    BookList.length > 0 && BookList.map((book, index) => {
                                        return (
                                            <Pressable key={index} onPress={() => navigation.navigate('Book', {book})}>
                                                <List.Item
                                                    title={book.title}
                                                    left={() => {
                                                        return (
                                                            <Image
                                                                style={{ height: 70, width: 50 }}
                                                                source={{ uri: book.imageUrl }}
                                                            />
                                                        )
                                                    }}
                                                />
                                            </Pressable>
                                        )
                                    }) || (
                                        <View height={200} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "lightgray"
                                        }}>
                                            <Text>
                                                There are no books available.
                                            </Text>
                                        </View>
                                    )
                                }
                            </List.Section>
                            
                        ) : (
                            <View height={200}>
                                <ActivityIndicator animating={true} color={MD2Colors.red800} />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
