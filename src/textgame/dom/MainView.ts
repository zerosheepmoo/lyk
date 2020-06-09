/*****************************************
| MainView.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { DOMBase } from './DOMBase'
import { Section } from './Section';

/**
 * 메인 화면 dom 클래스
 */
export class MainView extends DOMBase {
    
    private _statusTab: Section;
    private _storyTab: Section;
    private _choiceTab: Section;
    private _itemTab: Section;

    constructor(div: HTMLDivElement, styleName: string) {
        super(div);
        this._setStyle(styleName);
    }
}