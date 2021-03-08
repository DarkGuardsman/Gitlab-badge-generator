import https from "https";

export default function jsonDataCall(url, callback) {
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            if(data !== null && data !== undefined && data.trim() !== "") {

                const json = JSON.parse(data);

                if (json.message !== undefined && json.message.startsWith("404")) {
                    throw new Error(json.message);
                }

                //Convert string data to json
                callback(json);
            } else {
                throw new Error("Failed to get JSON data for call " + url);
            }

        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

