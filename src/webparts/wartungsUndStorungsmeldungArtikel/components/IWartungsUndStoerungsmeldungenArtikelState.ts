import {ISPListItem} from "../../../Services/ISP";

export interface IWartungsUndStoerungsmeldungArtikelState {
    listOfArticles: ISPListItem[];
    totalArticles: number;
    shownItem: number;
    dataIsLoaded: boolean;
}
