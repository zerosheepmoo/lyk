/*****************************************
| IStories.ts                            
| 2020. 06. 18. created by zerosheepmoo  |
******************************************/

import { IStory } from "./IStory";

/**
 * 입력용 스토리들
 */
export interface IStories{
    [name: string]: IStory;
}