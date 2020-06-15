/*****************************************
 | ItemSection.ts                            
 | 2020. 06. 15. created by zerosheepmoo  |
 ******************************************/

import { Section } from "./Section";
import { SectionType, SectionClassName } from "../Type";
import { InnerExp, ExpParser } from "../utils/Parser";

export class ItemSection extends Section {

    constructor(parent: Section, type: SectionType.ITEM, code: number, className?: string) {
        super(parent, type, className, code);
    }

    /**
     * 렌더링한다.
     * 
     * @param innerExp - 내부 표현식
     */
    render(innerExp?: InnerExp) {
        if (innerExp && (!this._innerExp || this._innerExp !== innerExp)) {
            this._innerExp = innerExp;
        }
        let ih = ExpParser.getItemInnerHTML(this.innerHTML, this._innerExp);
        this.dom.innerHTML = ih;
    }

    ///////// inherited /////////

    protected _createDom() {
        if (this._createCallback) {
            return this._createCallback();
        }
        return document.createElement('span');
    }

    protected _setStyle(className?: string) {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.ITEM;
        }
    }

    protected addChild(type: SectionType, code: number, template?: string, innerExp?: InnerExp): Section {
        throw new Error('ItemSection cannot add a child Section.')
    }
}