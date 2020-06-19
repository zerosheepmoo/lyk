/*****************************************
| ChoiceContainer.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { ContainerSection } from "./ContainerSection";
import { Section } from "./Section";
import { SectionType } from "../Type";
import { InnerExp } from "../utils/Parser";

export class ChoiceContainer extends ContainerSection {
    
    constructor(parent: Section, type: SectionType.CHOICES, className?: string) {
        super(parent, type, className);
    }
    
    protected addChild(type: SectionType, template: string, code: number, innerExp: InnerExp): Section {
        throw new Error("Method not implemented.");
    }
    protected _setStyle(className?: string): void {
        throw new Error("Method not implemented.");
    }
    render(innerExp?: InnerExp): void {
        throw new Error("Method not implemented.");
    }
}