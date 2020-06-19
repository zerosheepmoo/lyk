import { DOMNotExistError } from "../utils/Errors";

/*****************************************
| DOMBase.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

/**
 * 베이스 클래스
 */
export abstract class DOMBase {
    private _dom: HTMLElement;
    protected _childs: DOMBase[] = [];
    protected _parent: DOMBase | null = null;

    constructor(parent?: DOMBase, eleID?: string) {
        if (eleID) {
            const dom = document.getElementById(eleID);
            if (dom) {
                this._dom = dom;
            }
            else {
                throw DOMNotExistError;
            }
        }
        else {
            const dom = this._createDom();
            if (dom) {
                this._dom = dom;
            }
            else {
                throw DOMNotExistError;
            }
        }
    }

    get dom() {
        return this._dom;
    }
    get childs() {
        return this._childs;
    }

    protected _setStyle(styleName?: string) {
        if (styleName) {
            this._dom.className = styleName;
        }
    }
    protected abstract _createDom(): HTMLElement | null;
}