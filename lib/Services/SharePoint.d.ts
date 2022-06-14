import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPListItem } from "./ISP";
export declare class SPService {
    private _context;
    constructor(context: WebPartContext);
    getSPListData(listName: string): Promise<ISPListItem[]>;
}
//# sourceMappingURL=SharePoint.d.ts.map