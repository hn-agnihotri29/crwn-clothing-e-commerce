import { useEffect } from "react"

import { useDispatch } from "react-redux"

import { Routes, Route } from "react-router-dom"

import Category from "../category/category.component"
import CategoriesPreview from "../categories-preview/categories-preview.component"

import { fetchCategoriesAsync } from "../../store/categories/category.action"

import './shop.styles.scss'

const Shop = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
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