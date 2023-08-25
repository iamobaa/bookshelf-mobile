import { PostMan } from "../../../Helpers";


export const AttemptAddBook = async ({
    payload, navigation
}) => {
    for(let p in payload) {
        console.log(p, ": ", payload[p])
        if(!p) {
            return "Something Went Wrong."
        }
    }
    
    const responseObject = await PostMan(
        `/books`, 
        'post',
        payload
    )
    // Handle response
    if (responseObject.status === 'success') {
        return navigation.navigate('Home')
    } else {
        // Set New State
        console.log("Error: ", Error)
        console.log("responseObject: ", responseObject)
        return null
    }
}


export const AttemptUpdateBook = async ({
    bookId, payload, navigation
}) => {
    for(let p in payload) {
        console.log(p, ": ", payload[p])
        if(!p) {
            return "Something Went Wrong."
        }
    }
    
    const responseObject = await PostMan(
        `/books/${bookId}`, 
        'put',
        payload
    )
    // Handle response
    if (responseObject.status === 'success') {
        return navigation.navigate('Home')
    } else {
        // Set New State
        console.log("Error: ", Error)
        console.log("responseObject: ", responseObject)
        return null
    }
}


export const AttemptDeleteBook = async ({
    bookId, navigation
}) => {
    const responseObject = await PostMan(
        `/books/${bookId}`, 
        'delete'
    )
    // Handle response
    if (responseObject.status === 'success') {
        return navigation.navigate('Home')
    } else {
        // Set New State
        console.log("Error: ", Error)
        console.log("responseObject: ", responseObject)
        return null
    }
}


export const AttemptFetchBooks = async ({
    setBookList
}) => {
    const responseObject = await PostMan(
        `/books`, 
        'get'
    )
    // Handle response
    if (responseObject.status === 'success') {
        let responseData = responseObject.data
        console.log("responseData: ", responseData)
        setBookList(responseData)
    } else {
        // Set New State
        console.log("Error: ", Error)
        console.log("responseObject: ", responseObject)
        return null
    }
}
