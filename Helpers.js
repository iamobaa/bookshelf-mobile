
export const PostMan = async (
    uriPath,
    method,
    payload,
    stringified = true,
    headers = {}
) => {
    let responseObject

    const setHeaders = () => {
        if (headers // 👈 null and undefined check
            && Object.keys(headers).length === 0
            && Object.getPrototypeOf(headers) === Object.prototype
        ) {
            if (stringified) { headers['Content-Type'] = 'application/json' }
            if (stringified) { headers['Accept'] = 'application/json' }
        }
        console.log("headers: ", headers)
        return headers
    }

    let url = "http://10.0.2.2:8080" + uriPath

    let requestBody = {
        method: method,
        headers: new Headers(setHeaders()),
    }
    if (payload) {
        requestBody['body'] = stringified ? JSON.stringify(payload) : payload
    }

    await fetch(url, requestBody)
        .then(async response => {
            // console.log("response: ", response)
            const contentType = response.headers.get("content-type");
            let errorData

            if (response.ok) {
                if (response.status === 200 || response.status === 201) {

                    if (contentType.indexOf("application/json") !== -1) {
                        return {
                            statusCode: response.status,
                            data: await response.json(),
                        }
                    } else if (contentType.indexOf("application/pdf") !== -1 || contentType.indexOf("image/") !== -1) {
                        return {
                            statusCode: response.status,
                            data: await response.blob(),
                        }
                    } else {
                        return {
                            statusCode: response.status,
                            data: await response.text(),
                        }
                    }
                } else if (response.status === 204) {
                    return {
                        statusCode: response.status,
                        data: null,
                    }
                }
            } else {
                if (response.status === 400 || 401) {
                    return {
                        statusCode: response.status,
                        data: await response.json(),
                    }
                }

                if (response.status === 404) {
                    return {
                        statusCode: response.status,
                        data: await response.text(),
                    }
                }


                errorData = await response.json()
                throw new Error(errorData.message)
            }
        })
        .then(responseData => {
            if (responseData.statusCode === 400) {
                responseObject = {
                    data: responseData.data,
                    status: 'bad_request',
                }
            } else if (responseData.statusCode === 401) {
                responseObject = {
                    data: responseData.data,
                    status: 'unauthorized',
                }
            } else if (responseData.statusCode === 404) {
                responseObject = {
                    data: {
                        message: "Not Found",
                        content: responseData.data
                    },
                    status: 'error',
                }
            } else {
                responseObject = {
                    data: responseData.data,
                    status: 'success',
                }
            }
        })
        .catch(errorData => {
            // console.log("errorData: ", errorData.message)
            responseObject = {
                data: {
                    message: errorData.message,
                },
                status: 'error',
            }
        })
    return responseObject
}

export function ValidateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function NormalizePhoneNumber(value, previousValue, toDisplay) {
    // console.log(value, previousValue, toDisplay)

    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    // console.log('currentValue: ', currentValue)

    if (toDisplay) {
        if (!previousValue || value.length > previousValue.length) {
            if (cvLength < 4) return currentValue;
            if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
            let normalizedOutput = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
            return [currentValue, normalizedOutput]
        }
    }
    return [currentValue, null]
};