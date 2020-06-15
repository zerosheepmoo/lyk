import { ContainerSection } from "./ContainerSection";
import { Section } from "./Section";
import { SectionType, SectionClassName } from "../Type";
import { ItemSection } from "./ItemSection";
import { InnerExp, ExpParser } from "../utils/Parser";

/*****************************************
| ItemContainer.ts                            
| 2020. 06. 15. created by zerosheepmoo  |
******************************************/

export class ItemContainer extends ContainerSection {
    constructor(parent: Section, type: SectionType.ITEM_CON, className?: string) {
        super(parent, type, className);
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
    addChild(type: SectionType.ITEM, code: number, template?: string, innerExp?: InnerExp): ItemSection {
        let child = new ItemSection(this, type, code);
        if (template && innerExp) {
            child.setInnerHTML(template, innerExp);
        }
        else {
            child.render(innerExp);
        }
        this._childs.push(child);
        this.dom.appendChild(child.dom);

        return child;
    }

    /**
     * 렌더링한다.
     */
    render() {
        if (this._childs.length > 0) {
            for (let i = 0, len = this._childs.length; i < len; i++) {
                this._childs[i].render();
            }
        }
    }

    ///////// inherited /////////
    protected _setStyle(className?: string) {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.ITEM_CON;
        }
    }
}