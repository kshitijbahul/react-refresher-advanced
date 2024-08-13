import {DirectoryItemContainer,BackgroundImage, Body} from './directory-item.styles.jsx';

const DirectoryItem = ({category}) => {
    const { id, title, imageUrl } = category;
    return (
        <DirectoryItemContainer key={id}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
          </DirectoryItemContainer>
    );
}

export default DirectoryItem;