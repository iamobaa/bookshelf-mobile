import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import {
    Text,
    List,
    ActivityIndicator, 
    MD2Colors, 
    MD3Colors
} from 'react-native-paper';
  

export default function HomeScreen() {
    const isDarkMode = useColorScheme() === 'dark';

    const [BookList, setBookList] = useState([]) 

    const backgroundStyle = {
        // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        backgroundColor: isDarkMode ? "darkgray" : "lightgray",
    };

    function Section({children, title}) {
        const isDarkMode = useColorScheme() === 'dark';
        return (
          <View style={[]}>
            <Text
              style={[]}>
              {title}
            </Text>
            <Text
              style={[]}>
              {children}
            </Text>
          </View>
        );
    }
  
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <View
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                    }}
                >
                    <Text variant={"headlineLarge"}>Welcome to bookshelf</Text>
                    <Text >These are all the available books in store</Text>

                    {/* <Section title="Step One">
                        Edit <Text >App.tsx</Text> to change this
                        screen and then come back to see your edits.
                    </Section>
                    <Section title="Learn More">
                        Read the docs to discover what to do next:
                    </Section> */}

                    {
                        BookList ? (
                            <List.Section>
                                <List.Subheader>All Books</List.Subheader>
                                
                                {
                                    BookList.length > 0 && BookList.map(book => {
                                        return (
                                            <List.Item
                                                title={book.title}
                                                left={() => {
                                                    return (
                                                        <List.Icon color={MD3Colors.tertiary70} icon="folder" />
                                                    )
                                                }}
                                            />
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
