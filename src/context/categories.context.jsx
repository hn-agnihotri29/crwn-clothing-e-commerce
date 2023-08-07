import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCollectionAndDocument } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js"

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({})

    //Use it only one time beacuse it create reduancy in our database
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])
    
    //any asyn thing we need to do we wrap it in asyn function
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap =  await getCollectionAndDocument()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [])

    const value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}