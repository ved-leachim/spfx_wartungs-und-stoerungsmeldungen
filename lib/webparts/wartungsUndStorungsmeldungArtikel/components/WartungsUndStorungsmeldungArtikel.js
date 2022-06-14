var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './WartungsUndStorungsmeldungArtikel.module.scss';
import { SPService } from "../../../Services/SharePoint";
import { PrimaryButton, Spinner } from "office-ui-fabric-react";
import { CarrouselDirection } from "../model/CarrouselDirection";
import { AzureTranslator } from "../../../Services/Translation";
var WartungsUndStorungsmeldungArtikel = /** @class */ (function (_super) {
    __extends(WartungsUndStorungsmeldungArtikel, _super);
    function WartungsUndStorungsmeldungArtikel(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            listOfArticles: [],
            totalArticles: 0,
            dataIsLoaded: false,
            shownItem: 0
        };
        if (_this.props.context.pageContext.web.language != 1031) {
            _this._azureTranslator = new AzureTranslator();
        }
        _this._spService = new SPService(_this.props.context);
        return _this;
    }
    WartungsUndStorungsmeldungArtikel.prototype.componentDidMount = function () {
        var _this = this;
        var language = this.props.context.pageContext.web.languageName.substring(0, 2);
        console.log(this.props.context.pageContext.web.language);
        console.log(language);
        this._spService.getSPListData('Wartungs und Stoerungsmeldungen')
            .then(function (responseData) {
            _this.setState({
                listOfArticles: responseData,
            });
        }).catch(function (error) {
            alert(error);
        })
            .then(function () {
            _this.setState({
                totalArticles: _this.state.listOfArticles.length,
            });
            delete _this._spService;
        })
            .then(function () {
            if (_this._azureTranslator != null) {
                var _loop_1 = function (i) {
                    Promise.all([
                        _this._azureTranslator.translate(_this.state.listOfArticles[i].Title, language),
                        _this._azureTranslator.translate(_this.state.listOfArticles[i].Category, language),
                        _this._azureTranslator.translate(_this.state.listOfArticles[i].Description, language),
                        _this._azureTranslator.translate(_this.state.listOfArticles[i].TaxCatchAll[1].Term, language)
                    ])
                        .then(function (translations) {
                        //console.log(translations[0][0]);
                        //console.log(translations[0][0].translations[0].text);
                        _this.state.listOfArticles[i].Title = translations[0][0].translations[0].text;
                        _this.state.listOfArticles[i].Category = translations[1][0].translations[0].text;
                        _this.state.listOfArticles[i].Description = translations[2][0].translations[0].text;
                        _this.state.listOfArticles[i].TaxCatchAll[1].Term = translations[3][0].translations[0].text;
                    })
                        .then(function () {
                        _this.setState({ dataIsLoaded: true });
                    });
                };
                for (var i = 0; i < _this.state.totalArticles; i++) {
                    _loop_1(i);
                }
            }
            else {
                _this.setState({ dataIsLoaded: true });
            }
        });
    };
    WartungsUndStorungsmeldungArtikel.prototype.render = function () {
        var _this = this;
        var _a = this.props, isDarkTheme = _a.isDarkTheme, environmentMessage = _a.environmentMessage, hasTeamsContext = _a.hasTeamsContext, userDisplayName = _a.userDisplayName;
        return (
        // Wait for Data from inital fetching in ComponentDidMount()
        !this.state.dataIsLoaded ?
            React.createElement(Spinner, { label: "Daten werden geladen...", ariaLive: "assertive", labelPosition: "right" }) :
            React.createElement("div", null,
                React.createElement("section", { id: "Card", className: styles.card },
                    React.createElement("div", { style: { margin: "auto" } },
                        React.createElement("img", { style: { maxWidth: "100%" }, src: this.state.listOfArticles[this.state.shownItem].Image.Url }),
                        React.createElement("br", null),
                        React.createElement("br", null)),
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Kategorie: ")),
                            React.createElement("td", null, this.state.listOfArticles[this.state.shownItem].Category)),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Titel: ")),
                            React.createElement("td", null, this.state.listOfArticles[this.state.shownItem].Title)),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Beschreibung: ")),
                            React.createElement("td", null,
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: this.state.listOfArticles[this.state.shownItem].Description } }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Start Event: ")),
                            React.createElement("td", null, this.state.listOfArticles[this.state.shownItem].StartDateTime.toString())),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Ende Event: ")),
                            React.createElement("td", null, this.state.listOfArticles[this.state.shownItem].RemoveStartDateTime.toString())),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "IT-Tag: ")),
                            React.createElement("td", null, this.state.listOfArticles[this.state.shownItem].TaxCatchAll[1].Term))),
                    React.createElement("br", null),
                    React.createElement("div", { id: "Navigation", style: {
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "space-between"
                        } },
                        React.createElement(PrimaryButton, { text: "<--", onClick: function () { return _this._handleCarrouselClick(CarrouselDirection.BACKWARD); } }),
                        React.createElement("span", { style: { margin: 10 } }, (this.state.shownItem + 1) + "/" + this.state.totalArticles),
                        React.createElement(PrimaryButton, { text: "-->", onClick: function () { return _this._handleCarrouselClick(CarrouselDirection.FORWARD); } })))));
    };
    WartungsUndStorungsmeldungArtikel.prototype._handleCarrouselClick = function (direction) {
        if (direction == CarrouselDirection.BACKWARD) {
            if (this.state.shownItem == 0) {
                this.setState({ shownItem: (this.state.totalArticles - 1) });
            }
            else {
                this.setState({ shownItem: (this.state.shownItem - 1) });
            }
        }
        else {
            if (this.state.shownItem == (this.state.totalArticles - 1)) {
                this.setState({ shownItem: 0 });
            }
            else {
                this.setState({ shownItem: (this.state.shownItem + 1) });
            }
        }
    };
    return WartungsUndStorungsmeldungArtikel;
}(React.Component));
export default WartungsUndStorungsmeldungArtikel;
//# sourceMappingURL=WartungsUndStorungsmeldungArtikel.js.map