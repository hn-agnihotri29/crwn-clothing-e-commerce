import { createAction } from "../../utils/reducer/reducer.utlis";
import { CATEGORIES_ACTION_TYPES } from "./category.types"


export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)