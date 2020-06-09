/*****************************************
| StatusManager.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Status } from "./Status";
import { IStatus } from "./interfaces/IStatus";

/**
 * 스테이터스 매니저 클래스
 */
export class StatusMananger {
    private _stats: Status[] = [];

    /**
     * 등록된 스테이터스들
     */
    get stats() {
        return this._stats;
    }

    /**
     * 스테이터스들을 등록한다.
     * 
     * @param names - 등록할 스테이터스명
     */
    addStatus(names: string[] | string, options?: IStatus| IStatus[]) {
        if (Array.isArray(names)) {
            for (let i = 0, len = names.length; i < len; i++) {
                const status = this._createStatus(names[i]);
                this._stats.push(status);
                if(options) {
                    if(Array.isArray(options)) {
                        status.setOptions(options[i]);
                    }
                    else {
                        status.setOptions(options);
                    }
                }
            }
        }
        else {
            const stat = this._createStatus(names)
            this._stats.push(stat);
            if (options && !Array.isArray(options)) {
                stat.setOptions(options);
            }
        }
    }
    private _createStatus(name: string): Status {
        return new Status(name);
    }

    /**
     * 스테이터스들을 제거한다.
     * 
     * @param names - 제거할 스테이터스 이름들
     */
    removeStatus(names: string[] | string) {
        if(Array.isArray(names)) {
            for (let i = 0, len = names.length; i < len; i++) {
                this._removeStat(names[i]);
            }
        }
        else {
            this._removeStat(names);
        }
    }
    private _removeStat(name: string) {
        const stats = this._stats;
        for (let i = 0, len = stats.length; i < len; i++) {
            if (stats[i].name === name) {
                stats.splice(i, 1);
            }
        }
    }

    /**
     * 해당하는 이름의 등록된 스테이터스 객체를 가져온다.
     * 
     * @param name - 설정한 스테이터스 이름
     */
    getStatus(name: string) {
        const stats = this._stats;
        for (let i = 0, len = stats.length; i < len; i++) {
            if(stats[i].name === name) {
                return stats[i];
            }
            else {
                throw new Error('There is no such Status');
            }
        }
    }
}