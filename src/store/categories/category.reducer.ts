import {  Category } from "./category.types"
import {   fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action"
import { AnyAction } from "redux";


//readonly can't be modifiy
export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
    
}


export const CATEGORIES_INITIAL_STATE  : CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

/**
 * As we know redux passes all the action to reducer to allow the specific action to pass through the reducer we need to use withMatcher
 */

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} as AnyAction
    ) : CategoriesState => {

    if(fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true};
    }

    if(fetchCategoriesSuccess.match(action)) {
        return {...state,categories: action.payload, isLoading: false };
    }

    if(fetchCategoriesFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false}
    }


    return state;

}