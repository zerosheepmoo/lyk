import { Section } from "./Section";
import { SectionType, SectionClassName } from "../Type";
import { InnerExp } from "../utils/Parser";

/*****************************************
| StatusSection.ts                            
| 2020. 06. 15. created by zerosheepmoo  |
******************************************/

export class StatusSection extends Section {

    constructor(parent: Section, type: SectionType.STAT, className?: string) {
        super(parent, type, className);
    }

    protected addChild(type: SectionType, template?: string, code?: number , innerExp?: InnerExp, className?: string): Section {
        throw new Error("Method not implemented.");
    }
    protected _createDom(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    protected _setStyle(className?: string): void {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.STAT;
        }
    }
    render(innerExp?: InnerExp): void {
        
    }

}