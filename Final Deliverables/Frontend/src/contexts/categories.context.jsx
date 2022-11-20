import {  createContext,useEffect,useState } from "react";

export const CategoriesContext = createContext({
    categoriesMap: {},
    isLoading : false,
});

export const CategoriesProvider = ({children})=>{
    const [categoriesMap,setCategoriesMap] = useState({});
    const [isLoading,setIsLoading] = useState({});
    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const response = await fetch('http://127.0.0.1:5000/getCategory',{
                method:'GET',
                header:{
                    'Access-Control-Allow-Origin':'*'
                }
            });
            const result = await response.json()
            const categoryMap = {
                'mens':JSON.parse(result.mens),
                'womens':JSON.parse(result.womens)
            }
            setIsLoading(false);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);
    const value = {categoriesMap,isLoading};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>

}