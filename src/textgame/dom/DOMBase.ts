/*****************************************
| DOMBase.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

export class DOMBase {
    private _dom: HTMLElement;

    constructor(dom?: HTMLElement) {
        if (dom) {
            this._dom = dom;
        }
    }

    get dom() {
        return this._dom;
    }

    protected _setStyle(styleName?: string) {
        if (styleName) {
            this._dom.className = styleName;
        }
    }
}