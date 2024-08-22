import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/products'; 

function ProductsCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories')
      .then(response => {
        setCategories(response.data);
        
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <ul className='w-75' style={{ borderRight: "1px solid #ccc" }}>
        {categories.map((category, index) => (
          <li key={index} className='nav-item my-2'>
            <Link className='nav-link' to={``}>{(category.name).toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsCategory;
