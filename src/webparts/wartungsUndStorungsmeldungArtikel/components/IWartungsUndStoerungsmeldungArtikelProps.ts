import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWartungsUndStoerungsmeldungArtikelProps {
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
