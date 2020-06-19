/*****************************************
| Type.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

/**
 * {@link Section."type"} 의 종류
 */
export enum SectionType {
    ITEM = 'item',
    ITEM_CON = 'itemContainer',
    STAT  = 'status',
    STAT_CON = 'statusContainer',
    CHOICES = 'choiceContainer',
    CHOICE = 'choice',
    STORY_CON = 'storyContainer',
    STORY = 'story',
    MAIN_CON = 'mainContainer',
    NONE = 'none'
}

export enum SectionClassName {
    ITEM = 'lyk-item',
    ITEM_CON = 'lyk-item-container',
    STAT = 'lyk-status',
    STAT_CON = 'lyk-status-container',
    MAIN_CON = 'lyk-main-container',
    CHOICES = 'choiceContainer',
    CHOICE = 'choice',
    STORY_CON = 'lyk-story-container',
    STORY = 'story'
}