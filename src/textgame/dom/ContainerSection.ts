import { Section } from "./Section";
import { SectionType } from "../Type";
import { InnerExp } from "../utils/Parser";

/*****************************************
| ContainerSection.ts                            
| 2020. 06. 15. created by zerosheepmoo  |
******************************************/

export abstract class ContainerSection extends Section {
    constructor(parent?: Section, type?: SectionType, className?: string) {
        super(parent, type, className);
    }
    
    findChilds(code: number) {
        const cs = this._childs;
        for (let i = 0, len = cs.length; i < len; i++) {
            if (cs[i].code === code) {
                return cs[i];
            }
        }
    }

    ///////// inherited /////////
    
    protected _createDom() {
        if (this._createCallback) {
            return this._createCallback();
        }
        return document.createElement('div');
    }

    protected abstract addChild(type: SectionType, code: number, template: string, innerExp: InnerExp): Section;
    
    protected abstract _setStyle(className?: string): void
}