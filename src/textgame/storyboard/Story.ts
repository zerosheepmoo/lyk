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
    private _open: boolean;
    private _close: boolean;

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

    /**
     * 해금 된 스토리 여부
     * 
     * @remarks
     * `true` 여야 StoryBoard 에서 읽어온다.
     */
    get open(): boolean {
        return this._open;
    }
    set open(value: boolean) {
        if (this._open !== value) {
            this._open = value;
        }
    }

    /**
     * 스토리 마침 여부
     * 
     * @remarks
     * `true` 면 다시 StoryBoard에서 읽어오지 않는다.
     */
    get close() {
        return this._close;
    }
    set close(value: boolean) {
        if (this._close !== value) {
            this._close = value;
        }
    }
}