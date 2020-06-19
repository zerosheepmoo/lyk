/*****************************************
| Parser.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

import { SectionType } from "../Type";

export class ExpParser {
    static getItemInnerHTML(innerHTML: string, innerExp: InnerExp, type?: SectionType) {
        if (type === SectionType.STORY) {
            let _ih = innerHTML.replace(/\{\{image\}\}/, `<img src="${innerExp.url}" alt="${innerExp.alt}"`);
            return _ih;
        }
        let _ih = innerHTML.replace(/\{\{name\}\}/, `${innerExp.name}`);
        _ih = _ih.replace(/\{\{count\}\}/, `${innerExp.itemCount}`);
        _ih = _ih.replace(/\{\{code\}\}/, `${innerExp.code}`);
        return _ih;
    }
    static numberChange(text: string, target: string) {
        let _ih = text.replace(/\{\{number\}\}/, target);
        return _ih;
    }
}

export interface InnerExp {
    name?: string;
    code?: string;
    itemCount?: string;

    url?: string;
    alt?: string;
}