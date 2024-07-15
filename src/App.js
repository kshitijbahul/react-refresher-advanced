
import './categories.styles.scss'; 

const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: '',
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl: '',
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl: '',
    },
    {
      id: 4,
      title: 'Womens',
      imageUrl: '',
    },
    {
      id: 5,
      title: 'Mens',
      imageUrl: '',
    },
  ];

  return (
    <div className="categories-container">
      { categories.map((category) => 
         (
          <div className="category-container" key={category.id}>
            <div className="background-image">
              <img src="https://via.placeholder.com/150" alt="category" />
            </div>
            <div className="category-body-contaner">
              <h2>{category.title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        )
      ) 
    }
    </div>
  );
}

export default App;