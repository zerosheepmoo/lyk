/*****************************************
| Choice.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

export class Choice {
    private _text: string;
    private _end: boolean;

    constructor(text: string) {
        this._text = text;
    }

    /**
     * 끝 선택지 인지의 여부
     * 
     * @remarks
     * `true` 시 다음스토리는 정해진 것.
     */
    get end() {
        return this._end;
    }
    set end(value: boolean) {
        this._end = value;
    }

    /**
     * 텍스트
     */
    get text() {
        return this._text;
    }
    set text(value: string) {
        this._text = value;
    }

}