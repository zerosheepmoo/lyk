/*****************************************
| IChoices.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { IChoice } from "./IChoice";

/**
 * 입력용 선택지들
 */
export interface IChoices{
    [name: string]: IChoice
}