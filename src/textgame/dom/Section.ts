/*****************************************
| Section.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { DOMBase } from "./DOMBase";
import { SectionType} from "../Type";
import { InnerExp } from "../utils/Parser";

export abstract class Section extends DOMBase {
    protected _childs: Section[] = [];
    private _code: number;
    private _innerHTML: string = ``;
    private _type: SectionType;
    protected _createCallback: () => HTMLElement;
    
    protected _innerExp: InnerExp;

    constructor(parent?: Section, type?: SectionType, className?: string, code?: number, eleID?: string) {
        super(parent, eleID);
        this._type = type || SectionType.NONE;
        this._parent = parent || null;
        this._code = code || -1;
        this._setStyle(className);
    }

    /**
     * 코드
     */
    get code() {
        return this._code;
    }
    set code(value: number) {
        if (this._code !== value) {
            this._code = value;
        }
    }

    get type() {
        return this._type;
    }

    /**
     * dom element 생성 콜백
     */
    get createCallback() {
        return this._createCallback;
    }
    set createCallback(value: () => HTMLElement) {
        if (this._createCallback !== value) {
            this._createCallback = value;
        }
    }

    /**
     * 안에 들어갈 html 표현식이 합쳐진 템플릿
     */
    get innerHTML() {
        return this._innerHTML;
    }

    setInnerHTML(value: string, innerExp: InnerExp) {
        this._innerHTML = value;
        this.render(innerExp);
    }

    

    /**
     * 자식을 제거한다.
     * 
     * @param code - 제거할 자식의 코드
     */
    removeChild(code: number) {
        let idx = this.findChild(code, true) as number;
        let target = this._childs.splice(idx, 1)[0];
        target.clear();
        this.dom.removeChild(target.dom);
        this.render();
    }

    /**
     * 모든 자식들 제거
     */
    removeAllChilds(render: boolean = false) {
        const len = this._childs.length;
        for (let i = len -1; i > -1; i--) {
            this._childs[i].clear();
            this.dom.removeChild(this._childs[i].dom);
            this._childs.splice(i, 1);
        }
        if (render) {
            this.render();
        }
    }

    /**
     * 섹션 클리어
     */
    clear() {
        const len = this._childs.length
        if (len > 0) {
            for (let i = 0; i <len; i++) {
                this._childs[i].removeAllChilds();
            }
        }
        this._innerExp = {};
    }


    /**
     * 원하는 자식 Section을 찾는다.
     * 
     * @param code - 찾고자 하는 Section 오브젝트의 code
     * @param asChildIndex - `true` 면 childindex 로 반환
     */
    findChild(code: number, asChildIndex?: boolean) {
        const c = this._childs;
        for (let i = 0, len = c.length; i < len; i++) {
            if (c[i].code === code) {
                if(asChildIndex) {
                    return i;
                }
                return c[i];
            }
        }
    }

    protected abstract addChild(type: SectionType, code: number, template?: string, innerExp?: InnerExp): Section;
    protected abstract _createDom(): HTMLElement | null;
    protected abstract _setStyle(className?: string): void;

    private _domAsItemSection() {
        let item = document.createElement('span');
        return item;
    }
    private _domAsItemConatiner() {
        let itemCon = document.createElement('div');
        return itemCon;
    }
    private _domAsStatusContainer() {
        let statCon = document.createElement('div');
        return statCon;
    }
    private _domAsStatus() {
        let stat = document.createElement('div');
        return stat;
    }


    abstract render(innerExp?: InnerExp): void;
}