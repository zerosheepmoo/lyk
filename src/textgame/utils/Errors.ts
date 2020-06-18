/*****************************************
| Errors.ts                            
| 2020. 06. 15. created by zerosheepmoo  |
******************************************/


export const NotAutoMode = new Error('The gameView is not set as auto mode');
export const AlreadyExistView = new Error('gameView already exists.');
export const NotSpecifyError = new Error('elementID is not specified');
export const DOMNotExistError = new Error('element id or createDom function is required.')
export const DMNotExistError = new Error('There is no DataManager on Controller. You should link DataManager to Controller');
export const DMNotExistErrorCore = new Error('There is no DataManager in core things such as itemManager, statusManager or StoryBoard');
export const MethodExistError = new Error('There is no such method on this instance');
export const UnexpectedError = new Error('Unexpected unknown error. Only the maintainer knows');
export const ItemFCountError = new Error('the item is now Fixed Count');