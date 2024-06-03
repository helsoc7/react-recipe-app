import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const getRecipeById = async (id) => {
    const response = await fetch(`http://localhost:3001/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const recipe = await response.json();
    return recipe;
  };

  const Header = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const [recipeName, setRecipeName] = useState('');
  
    useEffect(() => {
      const fetchRecipeName = async () => {
        if (pathnames[0] === 'recipe' && pathnames[1]) {
          try {
            const recipe = await getRecipeById(pathnames[1]);
            setRecipeName(recipe.name);
          } catch (error) {
            console.error('Failed to fetch recipe:', error);
          }
        }
      };
      fetchRecipeName();
    }, [pathnames]);
  
    return (
      <header className="bg-gray-600 text-white p-4">
        <h1 className="text-xl font-bold">Meine Rezepte</h1>
        <nav className="text-gray-400 text-sm">
          <ol className="list-reset flex">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
  
              if (index === 1 && pathnames[0] === 'recipe') {
                value = recipeName;
              }
  
              return (
                <li key={to} className="flex items-center">
                  <span className="mx-2">/</span>
                  {isLast ? (
                    <span>{value}</span>
                  ) : (
                    <Link to={to} className="text-gray-400 hover:text-white">{value}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </header>
    );
  }
  
  export default Header;