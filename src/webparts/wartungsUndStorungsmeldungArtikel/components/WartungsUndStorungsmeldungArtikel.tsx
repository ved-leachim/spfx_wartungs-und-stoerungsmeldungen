import * as React from 'react';
import styles from './WartungsUndStorungsmeldungArtikel.module.scss';
import {IWartungsUndStoerungsmeldungArtikelProps} from './IWartungsUndStoerungsmeldungArtikelProps';
import {IWartungsUndStoerungsmeldungArtikelState} from './IWartungsUndStoerungsmeldungenArtikelState';
import {SPService} from "../../../Services/SharePoint";
import {PrimaryButton, Spinner} from "office-ui-fabric-react";
import {CarrouselDirection} from "../model/CarrouselDirection";
import {AzureTranslator} from "../../../Services/Translation";

export default class WartungsUndStorungsmeldungArtikel extends React.Component<IWartungsUndStoerungsmeldungArtikelProps, IWartungsUndStoerungsmeldungArtikelState> {

    private _spService: SPService;
    private _azureTranslator: AzureTranslator;

    constructor(props: IWartungsUndStoerungsmeldungArtikelProps, state: IWartungsUndStoerungsmeldungArtikelState) {
        super(props);
        this.state = {
            listOfArticles: [],
            totalArticles: 0,
            dataIsLoaded: false,
            shownItem: 0
        };

        if (this.props.context.pageContext.web.language != 1031) {
            this._azureTranslator = new AzureTranslator();
        }

        this._spService = new SPService(this.props.context);
    }

    public componentDidMount() {
        const language: string = this.props.context.pageContext.web.languageName.substring(0,2);
        console.log(this.props.context.pageContext.web.language);
        console.log(language);

        this._spService.getSPListData('Wartungs und Stoerungsmeldungen')
            .then((responseData) => {
                this.setState({
                    listOfArticles: responseData,
                });
            }).catch(error => {
            alert(error);
        })
            .then(() => {
                this.setState({
                    totalArticles: this.state.listOfArticles.length,
                });
                delete this._spService;
            })
            .then(() => {
                if (this._azureTranslator != null) {
                    for (let i: number = 0; i < this.state.totalArticles; i++){
                        Promise.all(
                            [
                                this._azureTranslator.translate(this.state.listOfArticles[i].Title, language),
                                this._azureTranslator.translate(this.state.listOfArticles[i].Category, language),
                                this._azureTranslator.translate(this.state.listOfArticles[i].Description, language),
                                this._azureTranslator.translate(this.state.listOfArticles[i].TaxCatchAll[1].Term, language)
                            ])
                            .then((translations) => {
                                //console.log(translations[0][0]);
                                //console.log(translations[0][0].translations[0].text);
                                this.state.listOfArticles[i].Title = translations[0][0].translations[0].text;
                                this.state.listOfArticles[i].Category = translations[1][0].translations[0].text;
                                this.state.listOfArticles[i].Description = translations[2][0].translations[0].text;
                                this.state.listOfArticles[i].TaxCatchAll[1].Term = translations[3][0].translations[0].text;
                            })
                            .then(() => {
                                this.setState({dataIsLoaded: true});
                            });
                    }
                } else {
                    this.setState({dataIsLoaded: true});
                }
            });
    }

    public render(): React.ReactElement<IWartungsUndStoerungsmeldungArtikelProps> {
        const {
            isDarkTheme,
            environmentMessage,
            hasTeamsContext,
            userDisplayName
        } = this.props;

        return (
            // Wait for Data from inital fetching in ComponentDidMount()
            !this.state.dataIsLoaded ?
                <Spinner label="Daten werden geladen..." ariaLive="assertive" labelPosition="right"></Spinner> :
                <div>
                    <section id="Card" className={styles.card}>
                        <div
                            style={{margin: "auto"}}
                        >
                            <img style={{maxWidth: "100%"}}
                                 src={this.state.listOfArticles[this.state.shownItem].Image.Url}/>
                            <br/><br/>
                        </div>
                        <table>
                            <tr>
                                <td>
                                    <b>Kategorie: </b>
                                </td>
                                <td>
                                    {this.state.listOfArticles[this.state.shownItem].Category}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Titel: </b>
                                </td>
                                <td>
                                    {this.state.listOfArticles[this.state.shownItem].Title}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Beschreibung: </b>
                                </td>
                                <td>
                                    <div
                                        dangerouslySetInnerHTML={{__html: this.state.listOfArticles[this.state.shownItem].Description}}></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Start Event: </b>
                                </td>
                                <td>
                                    {this.state.listOfArticles[this.state.shownItem].StartDateTime.toString()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ende Event: </b>
                                </td>
                                <td>
                                    {this.state.listOfArticles[this.state.shownItem].RemoveStartDateTime.toString()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>IT-Tag: </b>
                                </td>
                                <td>
                                    {this.state.listOfArticles[this.state.shownItem].TaxCatchAll[1].Term}
                                </td>
                            </tr>
                        </table>
                        <br/>
                        <div
                            id="Navigation"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "space-between"
                            }}
                        >
                            <PrimaryButton
                                text="<--"
                                onClick={() => this._handleCarrouselClick(CarrouselDirection.BACKWARD)}
                            ></PrimaryButton>
                            <span
                                style={{margin: 10}}
                            >
                                {(this.state.shownItem + 1) + "/" + this.state.totalArticles}
                            </span>
                            <PrimaryButton
                                text="-->"
                                onClick={() => this._handleCarrouselClick(CarrouselDirection.FORWARD)}
                            ></PrimaryButton>
                        </div>
                    </section>
                </div>
        );
    }

    private _handleCarrouselClick(direction: CarrouselDirection) {
        if (direction == CarrouselDirection.BACKWARD) {
            if (this.state.shownItem == 0) {
                this.setState({shownItem: (this.state.totalArticles - 1)});
            } else {
                this.setState({shownItem: (this.state.shownItem - 1)});
            }
        } else {
            if (this.state.shownItem == (this.state.totalArticles - 1)) {
                this.setState({shownItem: 0});
            } else {
                this.setState({shownItem: (this.state.shownItem + 1)});
            }
        }
    }
}
