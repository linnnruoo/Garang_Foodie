import { CV_API_KEY, CV_API_ENDPOINT } from 'react-native-dotenv';
import {decode as atob, encode as btoa} from 'base-64'
import * as _ from 'lodash';

const subscriptionKey = CV_API_KEY;

const baseURI = CV_API_ENDPOINT;

var headers = {
    'Content-Type': 'multipart/formdata',
    'Ocp-Apim-Subscription-Key': subscriptionKey 
}

const retrieveTags = async(filePath) => {
    let query= 'visualFeatures=Tags&language=en'
    let endPoint = `analyze?${query}`;
    const apiUrl = `${baseURI}${endPoint}`;
    
    const formData = new FormData();

    formData.append('data', {
        uri: filePath,
        type: 'image/jpeg',
        name: 'image.jpg'
    });

    
    try {
        const promise = await fetch(apiUrl, { method: 'post', body: formData, headers : headers});
        const json = await promise.json();
        return json.tags;
    }
    catch (error) {
        return Promise.reject(new Error(error));
    }
};

export { retrieveTags };
