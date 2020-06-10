/*****************************************
| Choice.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

export class Choice {
    private _text: string;
    private _name: string;
    private _nextFlows: string[] = [];

    constructor(name: string) {
        this._name = name;
    }

    /**
     * 끝 선택지 인지의 여부
     * 
     * @remarks
     * `true` 시 다음스토리는 정해지지 않은 것.
     */
    get end() {
        return this._nextFlows.length === 0;
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

    /**
     * 선택지 명
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
     * 해당 선택지를 선택 시 이어지는 이야기들
     */
    get nextFlows(): string[] {
        return this._nextFlows;
    }
    set nextFlows(value: string[]) {
        if (this._nextFlows !== value) {
            this._nextFlows = value;
        }
    }
}