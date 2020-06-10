/*****************************************
| MainView.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { DOMBase } from './DOMBase'
import { Section } from './Section';
import { SectionType } from '../Type';

/**
 * 메인 화면 dom 클래스
 * 
 * @remarks
 * 모든 코드를 지정할 때 `-1 금지하기
 */
export class MainView extends Section {
    
    private _statusTab: Section;
    private _storyTab: Section;
    private _choiceTab: Section;
    private _itemTab: Section;

    constructor(div: HTMLDivElement, styleName: string) {
        super(div);
        this._setStyle(styleName);
        this._itemTab = this.addChild(SectionType.ITEM_CON, -1);
    }

    get itemTab() {
        return this._itemTab;
    }

    protected _createDom() {
        return null;
    }
}