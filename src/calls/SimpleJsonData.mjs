import https from "https";

/**
 *
 * @param {String} url
 * @param {function<Object>}callback
 * @param {function<Object> | undefined} errorCallback
 */
export default function jsonDataCall(url, callback, errorCallback) {
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            if (data !== null && data !== undefined && data.trim() !== "") {

                const json = JSON.parse(data);

                if (json.message !== undefined && json.message.startsWith("404")) {
                    throw new Error(json.message);
                }

                //Convert string data to json
                callback(json);
            } else {
                throw new Error("Failed to get JSON data for call");
            }

        });
    }).on("error", (err) => {
        if (errorCallback !== undefined) {
            errorCallback(err);
        } else {
            console.log("Error: " + err.message);
        }
    });
}

