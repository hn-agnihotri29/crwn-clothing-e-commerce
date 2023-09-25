import { useEffect } from "react"

import { useDispatch } from "react-redux"

import { Routes, Route } from "react-router-dom"

import Category from "../category/category.component"
import CategoriesPreview from "../categories-preview/categories-preview.component"

import { getCollectionAndDocument } from "../../utils/firebase/firebase.utils";

import { setCategories } from "../../store/categories/category.reducer"

import './shop.styles.scss'

const Shop = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesArray  = await getCollectionAndDocument('categories')
            dispatch(setCategories(categoriesArray))
        }
        
        getCategoriesMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />      
        </Routes>
    )

}

export default Shop