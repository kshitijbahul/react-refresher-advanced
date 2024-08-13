import {DirectoryItemContainer,BackgroundImage, Body} from './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {
    const navigate = useNavigate();
    const categoryClickHandler = () => navigate(category.route);
    const { id, title, imageUrl } = category;
    return (
        <DirectoryItemContainer key={id} onClick={categoryClickHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
          </DirectoryItemContainer>
    );
}

export default DirectoryItem;