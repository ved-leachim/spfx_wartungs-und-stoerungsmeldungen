export interface ISPList {
    value: ISPListItem[];
}
export interface ISPListItem {
    Title: string;
    Description: string;
    ITTag: string;
    Image: IImageURL;
    Category: string;
    StartDateTime: string;
    RemoveStartDateTime: string;
    TaxCatchAll: ITaxCatchAllItem[];
}
interface ITaxCatchAllItem {
    ID: number;
    Term: string;
}
interface IImageURL {
    Description: string;
    Url: string;
}
export {};
//# sourceMappingURL=ISP.d.ts.map