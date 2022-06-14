import {v4 as uuidv4} from 'uuid';
import axios, {Axios} from 'axios';
import {ITranslations} from "./ITranslation";

export class AzureTranslator {

    private _key: string = "your-api-key";
    private _endpoint: string = "https://api.cognitive.microsofttranslator.com";
    private _path: string = "/translate";
    private _location: string = "switzerlandnorth";

    public translate(text: string, language: string): Promise<ITranslations> {

        let translationResponse: ITranslations;

        return axios({
            baseURL: this._endpoint,
            url: this._path,
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': this._key,
                'Ocp-Apim-Subscription-Region': this._location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'de',
                'to': language
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        })
            .then((response) => {
                translationResponse = response.data;
                return translationResponse;
            });
    }
}
