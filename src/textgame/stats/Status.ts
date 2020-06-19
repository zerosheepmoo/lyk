/*****************************************
| Status.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { IStatus } from "./interfaces/IStatus";

/**
 * 스테이터스 클래스
 */
export class Status {
    private _name: string;
    private _level: number;
    private _minLevel: number = 0;
    private _maxLevel: number = Infinity;
    private _fixed: boolean;


    constructor(name: string, level?: number) {
        this._name = name;
        this._level = level || this._maxLevel;
    }

    /**
     * 스테이터스 명, 종류
     */
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if(this._name !== value) {
            this._name = value;
        }
    }

    /**
     * 스테이터스 단계
     */
    get level(): number {
        return this._level;
    }
    set level(value: number) {
        if(!this._fixed || this._level !== value) {
            if (value > this._maxLevel) {
                this._level = this._maxLevel;
            }
            else if (value < this._minLevel) {
                this._level = this._minLevel;
            }
            else {
                this._level = value;
            }
        }
    }

    /**
     * 스테이터스 레벨의 최소값
     */
    get minLevel(): number {
        return this._level;
    }
    set minLevel(value: number) {
        if(this._level !== value) {
            this._level = value;
        }
    }

    /**
     * 스테이터스 레벨의 최대값
     */
    get maxLevel(): number {
        return this._level;
    }
    set maxLevel(value: number) {
        if(this._level !== value) {
            this._level = value;
        }
    }

    /**
     * level 고정 여부
     */
    get fixed(): boolean {
        return this._fixed;
    }
    set fixed(value: boolean) {
        this._fixed = value;
    }

    //////// methods ////////

    /**
     * status 의 level 이 상승함
     * 
     * @param amount - 상승량
     */
    add(amount: number) {
        this.level += amount;
    }

    /**
     * status 의 level 이 내려감
     * 
     * @param amount - 피해량
     */
    damage(amount: number) {
        this.level -= amount;
    }

    /**
     * 스테이터스의 내용들에 대한 설정문서를 설정
     * 
     * @param value - 옵션 값
     */
    setOptions(value: IStatus) {
        this.fixed = value.fixed || false;
        this.minLevel = value.minLevel || 0;
        this.maxLevel = value.maxLevel || 0;
        this.level = value.level || 3;
    }
}