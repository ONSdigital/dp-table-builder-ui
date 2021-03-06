// import { HttpError } from './error';
// import log, { eventTypes } from '../log';
// import uuid from 'uuid/v4';
// import user from '../api-clients/user';
// import notifications from '../notifications';
import "babel-polyfill"




/**
 * 
 * @param {string} method - must match an HTTP method (eg "GET")
 * @param {string} URI - URI to make a request to
 * @param {boolean} willRetry - (default = true) if true then this function will retry the connection on failure 
 * @param {object} body - JSON of the request body (if it's an applicable HTTP method)
 * @param {function} onRetry - Runs whenever the request is going to be retried. Added for use in unit tests, so that we can run our mocked timeOuts (or else the async test breaks)
 * @param {boolean} callerHandles401 - Flag to decide whether caller or global handler is to handle 401 responses 
 * @param {string} responseFormat - should response be JSON or Blob  - required for table-builder  for xls preview download
 * @returns {Promise} which returns the response body in JSON format
 */

export default function request(method, URI, willRetry = true, onRetry, body, callerHandles401, responseFormat) {
    const baseInterval = 50;
    let interval = baseInterval;
    const maxRetries = 5;
    let retryCount = 0;

    return new Promise(function (resolve, reject) {
        tryFetch(resolve, reject, URI, willRetry, body, responseFormat);
    });


    function tryFetch(resolve, reject, URI, willRetry, body, responseFormat) {
        const UID = '123'
        const logEventPayload = {
            method: method,
            requestID: UID,
            willRetry,
            retryCount,
            URI
        };
        const fetchConfig = {
            method,
            // credentials: "include",
            header: {
                'Content-Type': 'application/json',
                'Request-ID': UID
            }
        }

        if (method === "POST" || method === "PUT") {
            fetchConfig.body = JSON.stringify(body || {});
        }

        // log.add(eventTypes.requestSent, {...logEventPayload});

        fetch(URI, fetchConfig).then(response => {
            logEventPayload.status = response.status;
            logEventPayload.message = response.message;
            // log.add(eventTypes.requestReceived, logEventPayload);

            const responseIsJSON = response.headers.get('content-type').match(/application\/json/);

            if (response.status >= 500) {
                // throw new  HttpError(response);
            }

            if (response.status === 401) {

                if (callerHandles401) {
                    reject({ status: response.status, message: response.statusText });
                    return;
                }

                // To save doing this exact same function throughout the app we handle a 401 
                // here (ie at the lowest level possible)
                const notification = {
                    type: "neutral",
                    message: "Your session has expired so you've been redirected to the login screen",
                    isDismissable: true,
                    autoDismiss: 20000
                }
                //  user.logOut();
                //  notifications.add(notification);
                reject({ status: response.status, message: response.statusText });
                return;
            }

            if (!response.ok) {
                reject({ status: response.status, message: response.statusText });
                return;
            }

            logEventPayload.status = 200;

            if (!responseIsJSON && method !== "POST" && method !== "PUT") {

                // log.add(eventTypes.runtimeWarning, `Received request response for method '${method}' that didn't have the 'application/json' header`)
            }

            // We're wrapping this try/catch in an async function because we're using 'await' 
            // which requires being executed inside an async function (which the 'fetch' can't be set as)
            (async () => {

                try {

                    //table builder allows for xls/ csv previews
                    let responseType;
                    if (responseFormat == 'blob') {
                        responseType = await response.blob();
                    }
                    else { responseType = await response.json(); }

                    resolve(responseType);
                } catch (error) {
                    console.error("Error trying to parse request body as " + responseFormat, error);
                    // log.add(eventTypes.unexpectedRuntimeError, 'Attempt to parse JSON response from request but unable to. Error message: ' + error);

                    // We're not necessarily relying on a response with these methods
                    // so we should still resolve the promise, just with no response body
                    if (method === "POST" || method === "PUT") {
                        resolve();
                        return;
                    }

                    // We're trying to get data at this point and the body can't be parsed
                    // which means this request is a failure and the promise should be rejected
                    reject({ status: response.status, message: "JSON response body couldn't be parsed" });
                }
            })()
        }).catch((fetchError = { message: "No error message given" }) => {
            logEventPayload.message = fetchError.message;
            //log.add(eventTypes.requestFailed, logEventPayload);

            if (willRetry) {

                // retry post
                if (retryCount < maxRetries) {
                    setTimeout(function () { tryFetch(resolve, reject, URI, willRetry, body) }, interval);
                    retryCount++;
                    interval = interval * 2;
                    if (onRetry) {
                        onRetry(retryCount);
                    }
                } else {

                    // pass error back to caller when max number of retries is met
                    if (fetchError instanceof TypeError) {
                        // connection failed
                        reject({ status: 'FETCH_ERR', error: fetchError });
                    }
                    // else if (fetchError instanceof HttpError) {
                    //     // unexpected response
                    //     reject({status: 'RESPONSE_ERR', error: fetchError})
                    // }

                    else {
                        // unexpected error
                        reject({ status: 'UNEXPECTED_ERR', error: fetchError })
                    }

                    retryCount = 0;
                    interval = baseInterval;

                }
                return;
            }

            // pass error back to caller when max number of retries is met
            if (fetchError instanceof TypeError) {
                // connection failed
                reject({ status: 'FETCH_ERR', error: fetchError });
            }
            // else if (fetchError instanceof HttpError) {
            //     // unexpected response
            //     reject({status: 'RESPONSE_ERR', error: fetchError})
            // } 

            else {
                // unexpected error
                reject({ status: 'UNEXPECTED_ERR', error: fetchError })
            }

        });
    }
}