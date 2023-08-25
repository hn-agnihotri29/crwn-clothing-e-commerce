import { all, call, put, takeLatest } from "redux-saga/effects"

import { getCollectionAndDocument } from "../../utils/firebase/firebase.utils"

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
  } from './category.action';
  
import { CATEGORIES_ACTION_TYPES } from './category.types';
  
export function* fetchCategoriesAsync() {
try {
    const categoriesArray = yield call(getCollectionAndDocument, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
} catch (error) {
    yield put(fetchCategoriesFailed(error));
}
}
  
export function* onFetchCategories() {
//takeLatest--> take receive the actions, if we have bunch of same action they give latest one 
yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
);
}
  
export function* categoriesSaga() {
    //all---> run everything inside and only complete if all of it is done
    yield all([call(onFetchCategories)]);
}