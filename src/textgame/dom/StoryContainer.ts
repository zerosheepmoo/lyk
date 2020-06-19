/*****************************************
| StoryContainer.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { ContainerSection } from "./ContainerSection";
import { Section } from "./Section";
import { SectionType, SectionClassName } from "../Type";
import { InnerExp, ExpParser } from "../utils/Parser";
import { StorySection } from "./StorySection";
import { NoItemCode } from "../utils/Errors";

export class StoryContainer extends ContainerSection{
    
    constructor(parent: Section, type: SectionType.STORY_CON, className?: string) {
        super(parent, type, className);
    }

    findChild(): Section {
        return this._childs[0];
    }

    /**
     * 자식을 추가한다.
     * 
     * @param type - 섹션 종류
     * @param code - 코드
     * @param template - 템플릿
     * @param innerExp - 내부변수표현식
     * 
     * @returns 추가한 자식 섹션
     */
    addChild(type: SectionType.STORY, template?: string, code?: number, innerExp?: InnerExp, className?: string): StorySection {     
        let child = new StorySection(this, type, className);
        if (template && innerExp) {
            child.setInnerHTML(template, innerExp);
        }
        else if (template) {
            // 표현식 없는 거
            child.setInnerHTML(template);
        }
        else {
            // 표현식만 있는 거
            child.render(innerExp);
        }
        this._childs.push(child);
        this.dom.appendChild(child.dom);
        return child;
    }

    /**
     * 렌더링 한다.
     * 
     * @param innerExp - 내부 표현식
     */
    render(): void {
        if (this._childs.length > 0) {
            for (let i = 0, len = this._childs.length; i < len; i++) {
                this._childs[i].render();
            }
        }
    }

    ///////// inherited /////////
    protected _setStyle(className?: string): void {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.STORY_CON;
        }
    }
}