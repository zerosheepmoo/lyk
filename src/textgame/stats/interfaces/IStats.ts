/*****************************************
| IStats.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { IStatus } from "./IStatus";

/**
 * 입력용 스테이터스들 인터페이스
 */
export interface IStats {
    [name: string]: IStatus;
}