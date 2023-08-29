// https://jsonplaceholder.typicode.com/posts
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

const sendData  = (data, cb) => {        
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', SERVER_URL);
        xhr.setRequestHeader('Content-Type','Application/json');
    
        xhr.addEventListener('load', () => {
            if(xhr.status < 200 || xhr.status >= 300) {
                cb(new Error(xhr.status), xhr.response);
                return;
            };

            const data = JSON.parse(xhr.response);
            cb(null, data);
        });
    
        xhr.addEventListener('error', () => {
            cb(new Error(xhr.status), xhr.response);
        })

        xhr.send(JSON.stringify(data));
    } catch (err) {
        cb(new Error(err));
    };
};

const sendDataPromise = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', SERVER_URL);
            xhr.setRequestHeader('Content-Type','Application/json');
            xhr.addEventListener('load', () => {
                if(xhr.status < 200 || xhr.status >= 300) {
                    reject({status: xhr.status, statusText: xhr.statusText});
                } else {
                    resolve(xhr.response);
                };
            });
            xhr.addEventListener('error', () => {
                reject({status: xhr.status, statusText: xhr.statusText});
            });
            xhr.send(JSON.stringify(data));
        } catch (error) {
            reject({status: error.name, statusText: error.message});
        };
    });
};

export {sendData, sendDataPromise}