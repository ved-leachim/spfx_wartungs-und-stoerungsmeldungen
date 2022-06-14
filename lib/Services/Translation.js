import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
var AzureTranslator = /** @class */ (function () {
    function AzureTranslator() {
        this._key = "b34e7b0990654726adff18301440893b";
        this._endpoint = "https://api.cognitive.microsofttranslator.com";
        this._path = "/translate";
        this._location = "switzerlandnorth";
    }
    AzureTranslator.prototype.translate = function (text, language) {
        var translationResponse;
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
            .then(function (response) {
            translationResponse = response.data;
            return translationResponse;
        });
    };
    return AzureTranslator;
}());
export { AzureTranslator };
//# sourceMappingURL=Translation.js.map