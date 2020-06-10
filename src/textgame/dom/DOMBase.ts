/*****************************************
| DOMBase.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

/**
 * 베이스 클래스
 * 
 * @remarks
 * 무조건 첫번째 아규먼트는 dom 이다.
 */
export abstract class DOMBase {
    private _dom: HTMLElement;
    protected _childs: DOMBase[] = [];
    protected _parent: DOMBase | null = null;

    constructor(ele?: HTMLElement, type?: string, parent?: DOMBase) {
        if (ele) {
            this._dom = ele;
        }
        else {
            const dom = this._createDom(ele, type);
            if (dom) {
                this._dom = dom;
            }
            else {
                throw new Error('element id or createDom function is required.')
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
    protected _addChild(dom: DOMBase) {
        this._childs.push(dom);
    }
    protected abstract _createDom(...args: any[]): HTMLElement | null;
}