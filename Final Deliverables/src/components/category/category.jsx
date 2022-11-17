import { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import Spinner from "../spinner/spinner";
import ProductCard from "../product-card/product-card";

import { CategoryTitle, CategoryContainer, CategoryPreviewContainer,Preview } from "./category.styles";

const Category = ()=>{

    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const {isLoading} = useContext(CategoriesContext);
    
    const [products,setProducts]  = useState(categoriesMap[category]);
    
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);
    
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading 
                ? 
                    <Spinner />
                :
                    <CategoryContainer>
                        {
                            products && 
                            Object.keys(products).map((product)=>{
                                const items = products[product];
                                return <CategoryPreviewContainer key={product}>
                                            <h2>{product.toUpperCase()}</h2>
                                            <Preview>
                                                {
                                                    items.map((item)=>{
                                                        return <ProductCard key={item.id} product={item} />
                                                    })
                                                }
                                            </Preview>
                                        </CategoryPreviewContainer>
                            })
                        }
                    </CategoryContainer>
            }
        </Fragment>
    );
}

export default Category;