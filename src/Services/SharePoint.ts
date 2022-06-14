import {WebPartContext} from "@microsoft/sp-webpart-base";
import {ISPList, ISPListItem} from "./ISP";
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export class SPService {

    private _context: WebPartContext;

    constructor(context: WebPartContext) {
        this._context = context;
    }

    public getSPListData(listName: string) {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };

        const localDateTime = new Date().toISOString();

        const url: string = "https://your-tenant-name.sharepoint.com/sites/mybfh-Wartungs-und-Stoerungsmeldungen-de/_api/web/lists/GetByTitle('" + listName + "')/items?" +
            "$select=Title,Description,ITTag," +
            "Image,Category,StartDateTime,RemoveStartDateTime," +
            "TaxCatchAll/ID,TaxCatchAll/Term" +
            "&$expand=TaxCatchAll" +
            "&$filter=StartDateTime le datetime'" + localDateTime + "' and RemoveStartDateTime ge datetime'" + localDateTime + "'";

        let responseData: ISPListItem[] = [];
        return new Promise<ISPListItem[]>(async (resolve, reject) => {
            this._context.spHttpClient.get(url, SPHttpClient.configurations.v1)
                .then((rawResponse: SPHttpClientResponse) => {
                        rawResponse.json()
                            .then((jsonResponse: ISPList) => {
                                console.log(jsonResponse);
                                jsonResponse.value.map((spItem) => {
                                    let date = new Date(spItem.StartDateTime);
                                    spItem.StartDateTime = date.toLocaleString("de-CH", options);
                                    date = new Date(spItem.RemoveStartDateTime);
                                    spItem.RemoveStartDateTime = date.toLocaleString("de-Ch", options);
                                    responseData.push(spItem);
                                });
                                resolve(responseData);
                            });
                    },
                    (customError) => {
                        reject("An Error occurred during the fetching process of '" + listName + "' SPListData! | Error-Message: " + customError.message);
                    });
        });
    }
}
