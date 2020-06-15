/*****************************************
| Parser.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

export class ExpParser {
    static getItemInnerHTML(innerHTML: string, innerExp: InnerExp) {
        
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
}