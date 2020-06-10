/*****************************************
| Parser.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

export class ExpParser {
    static getItemInnerHTML(innerHTML: string, innerExp: InnerExp) {
        
        let _ih = innerHTML.replace(/\{\{name\}\}/, `${innerExp.name}`);
        _ih = _ih.replace(/\{\{count\}\}/, `${innerExp.itemCount}`);
        return _ih;
    }
    static getSign(text: string, signExp: SignExp) {
        let _ih = text.replace(/\{\{plus\}\}/, `${signExp.plus}`);
        _ih = _ih.replace(/\{\{minus\}\}/, `${signExp.minus}`);
        _ih = _ih.replace(/\{\{division\}\}/, `${signExp.division}`);
        _ih = _ih.replace(/\{\{multiple\}\}/, `${signExp.multiple}`);
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
export interface SignExp {
    plus?: string;
    minus?: string;
    multiple?: string;
    division?: string;
}