import CategoryItem from "../category-item/category-item";

import { DirectoryContainer } from "./directory.styles";

const categories = [
  {
    "id": 1,
    "title": "Mens",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    "route":"shop/mens"
  },
  {
    "id": 2,
    "title": "Womens",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    "route":"shop/womens"
  }
]

const Directory = ()=>{

  return (
    <DirectoryContainer>
      {
        categories.map((category)=>{
          return <CategoryItem key={category.id} category = {category}/>
        })
      }
    </DirectoryContainer>
  );
}

export default Directory;