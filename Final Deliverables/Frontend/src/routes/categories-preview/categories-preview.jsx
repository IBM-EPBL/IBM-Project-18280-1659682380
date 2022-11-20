import { Fragment} from "react";
import CategoryItem from "../../components/category-item/category-item";
import { PreviewContainer } from "./previews.styles";
import { subCategories } from "./subcategories";
const CategoriesPreview = ()=>{
    return (
        <Fragment>
            {
                subCategories.map((subCategory)=>{
                    const products = subCategory.products;
                    return (
                        <div key={subCategory.id}>
                            <h2>
                                {subCategory.title.toUpperCase()}
                            </h2>
                            <PreviewContainer key={subCategory.id}>
                                {
                                    Object.keys(products).map((product)=>{
                                        const item = products[product]
                                        return <CategoryItem key={item.id} category={item}/>
                                    })
                                }
                            </PreviewContainer>
                        </div>
                    )
                })
            }
        </Fragment>
    );
}

export default CategoriesPreview;