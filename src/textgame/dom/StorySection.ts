/*****************************************
| StorySection.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { Section } from "./Section";
import { SectionType, SectionClassName } from "../Type";
import { InnerExp, ExpParser } from "../utils/Parser";

export class StorySection extends Section{

    constructor(parent: Section, type: SectionType.STORY, className?: string) {
        super(parent, type, className);
    }

    
    protected _createDom(): HTMLElement | null {
        if (this._createCallback) {
            return this._createCallback();
        }
        return document.createElement('div');
    }
    protected _setStyle(className?: string): void {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.STORY;
        }
    }

    /**
     * 렌더링한다.
     * 
     * @param innerExp - 내부 표현식
     * 
     * {{image:alt}} : 이미지
     */
    render(innerExp?: InnerExp): void {
        if (innerExp && (!this._innerExp || this._innerExp !== innerExp)) {
            this._innerExp = innerExp;
        }
        let ih = ExpParser.getItemInnerHTML(this.innerHTML, this._innerExp);
        this.dom.innerHTML = ih;
    }

    //// unused ////
    protected addChild(type: SectionType): Section {
        throw new Error("StorySection cannot add the child section.");
    }

}