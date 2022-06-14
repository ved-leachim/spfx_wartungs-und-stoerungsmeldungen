import { ITranslations } from "./ITranslation";
export declare class AzureTranslator {
    private _key;
    private _endpoint;
    private _path;
    private _location;
    translate(text: string, language: string): Promise<ITranslations>;
}
//# sourceMappingURL=Translation.d.ts.map