/*****************************************
| Section.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { DOMBase } from "./DOMBase";
import { SectionType, SectionClassName } from "../Type";
import { ExpParser, InnerExp, SignExp } from "../utils/Parser";

export class Section extends DOMBase {
    protected _childs: Section[] = [];
    private _code: number;
    private _innerHTML: string = `{{ code }}`;
    private _type: SectionType;
    
    private _innerExp: InnerExp;
    private _signExp: SignExp;

    constructor(dom?: HTMLElement, parent?: Section, type?: SectionType, code?: number) {
        super(dom, type, parent);
        this._type = type || SectionType.NONE;
        this._parent = parent || null;
        this._code = code || -1;
        this._setStyle(this._type);
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

    /**
     * 안에 들어갈 html 표현식이 합쳐진 템플릿
     */
    get innerHTML() {
        return this._innerHTML;
    }

    setInnerHTML(value: string, innerExp: InnerExp, signExp: SignExp) {
        this._innerHTML = value;
        this._render(innerExp, signExp);
    }

    /**
     * 자식을 추가한다.
     * 
     * @param type - 섹션 종류
     * @param code - 코드
     * @param innerExp - 내부변수표현식
     * @param signExp - 기호표현식
     * 
     * @returns 추가한 자식 섹션
     */
    addChild(type: SectionType, code: number, template?: string, innerExp?: InnerExp, signExp?: SignExp) {
        let child = new Section(undefined, this, type, code);
        if (template && innerExp && signExp) {
            child.setInnerHTML(template, innerExp, signExp);
        }
        else {
            child._render(innerExp, signExp);
        }
        this._childs.push(child);
        this.dom.appendChild(child.dom);
        return child;
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
        this._render();
    }

    /**
     * 모든 자식들 제거
     */
    removeAllChilds() {
        const len = this._childs.length;
        for (let i = len -1; i > 0; i--) {
            this._childs[i].clear();
            this._childs.splice(i, 1);
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
        this._signExp = {};
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

    protected _createDom(ele: undefined, type: SectionType) {
        if (type === SectionType.ITEM) {
            return this._domAsItemSection();
        }
        else if (type === SectionType.ITEM_CON) {
            return this._domAsItemConatiner();
        }
        else {
            return null;
        }
    }
    protected _setStyle(typeOrClassName: string) {
        if (typeOrClassName === SectionType.ITEM) {
            this.dom.className = SectionClassName.ITEM;
        }
        else if (typeOrClassName === SectionType.ITEM_CON) {
            this.dom.className = SectionClassName.ITEM_CON;
        }
        else {
            this.dom.className = typeOrClassName;
        }
    }

    private _domAsItemSection() {
        let item = document.createElement('span');
        return item;
    }
    private _domAsItemConatiner() {
        let itemCon = document.createElement('div');
        return itemCon;
    }
    private _render(innerExp?: InnerExp, signExp?: SignExp) {
        if (this._childs.length > 0) {
            for (let i = 0, len = this._childs.length; i < len; i++) {
                this._childs[i]._render();
            }
        }
        else {
            if (this._type === SectionType.ITEM) {
                if (innerExp && (!this._innerExp || this._innerExp !== innerExp)) {
                    this._innerExp = innerExp;
                }
                if (signExp && (!this._signExp || this._signExp !== signExp)) {
                    this._signExp = signExp;
                }
                let ih = ExpParser.getItemInnerHTML(this._innerHTML, this._innerExp);
                ih = ExpParser.getSign(ih, this._signExp);
                this.dom.innerHTML = ih;
            }
        }
    }

    findChilds(code: number) {
        const cs = this._childs;
        for (let i = 0, len = cs.length; i < len; i++) {
            if (cs[i].code === code) {
                return cs[i];
            }
        }
    }
}