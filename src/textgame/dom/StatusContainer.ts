/*****************************************
| StatusContainer.ts                            
| 2020. 06. 15. created by zerosheepmoo  |
******************************************/

import { ContainerSection } from "./ContainerSection";
import { SectionType, SectionClassName } from "../Type";
import { InnerExp } from "../utils/Parser";
import { Section } from "./Section";
import { StatusSection } from './StatusSection';

export class StatusContainer extends ContainerSection{

    constructor(parent: Section, type: SectionType.STAT_CON, className?: string) {
        super(parent, type, className);
    }

    render(): void {
        if (this._childs.length > 0) {
            for (let i = 0, len = this._childs.length; i < len; i++) {
                this._childs[i].render();
            }
        }
    }

    //// inherited ////

    protected addChild(type: SectionType.STAT, template: string, code?: number, innerExp?: InnerExp, className?: string): StatusSection {
        let child = new StatusSection(this, type, className);
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

    protected _setStyle(className?: string): void {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.STAT_CON;
        }
    }
}