
import DirectoryItem from '../directory-item/directory-item.component';

import {DirectoriesContainer} from './category-menu.styles.jsx';

const CategoryMenu = ({categories}) => {
    
      return (
        <DirectoriesContainer>
            { categories.map((category) => 
                (
                <DirectoryItem key={category.id} category={category}></DirectoryItem>
                )
            ) 
            }
        </DirectoriesContainer>
      )
}

export default CategoryMenu;