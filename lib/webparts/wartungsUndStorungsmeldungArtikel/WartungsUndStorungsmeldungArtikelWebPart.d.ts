import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IWartungsUndStorungsmeldungArtikelWebPartProps {
}
export default class WartungsUndStorungsmeldungArtikelWebPart extends BaseClientSideWebPart<IWartungsUndStorungsmeldungArtikelWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    protected onInit(): Promise<void>;
    render(): void;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=WartungsUndStorungsmeldungArtikelWebPart.d.ts.map