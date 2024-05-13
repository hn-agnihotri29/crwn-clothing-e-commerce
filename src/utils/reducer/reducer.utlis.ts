import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
  };
  
export function withMatcher<AC extends () => AnyAction & { type: string }>(
actionCreator: AC
): Matchable<AC>;
  
export function withMatcher<
AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;
  
export function withMatcher(actionCreator: Function) {
const type = actionCreator().type;
return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
    return action.type === type;
    },
});
}
  

//T is is one of the enum value form category types
export type ActionWithPayload<T,P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}


/**
 * We need to make a function that takes a different type based on type and payload
 * for that we use function overloading from Typescript which uses the default function of Javascript
 */

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

//provide void otherwise we get an occur
export function createAction<T extends string>(type: T, payload: void): Action<T>;


export function createAction<T extends string, P> (type: T, payload: P) {
    return { type, payload }; 
}