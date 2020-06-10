/*****************************************
| Story.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

/**
 * 이야기 클래스
 */
export class Story {
    private _name: string;
    private _text: string;

    constructor(name: string) {
        this._name = name;
    }

    /**
     * 스토리명
     */
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
        }
    }

    /**
     * 이야기의 텍스트
     */
    get text(): string {
        return this._text;
    }
    set text(value: string) {
        if (this._text !== value) {
            this._text =value;
        }
    }
}