
import DirectoryItem from '../directory-item/directory-item.component';

import './category-menu.styles.scss';

const CategoryMenu = ({categories}) => {
    
      return (
        <div className="directories-container">
            { categories.map((category) => 
                (
                <DirectoryItem key={category.id} category={category}></DirectoryItem>
                )
            ) 
            }
        </div>
      )
}

export default CategoryMenu;