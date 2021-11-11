import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { url: '/search', text: '🔎 All' },
    { url: '/news', text: '📰 News' },
    { url: '/images', text: '📸 Images' },
    { url: '/videos', text: '📺 Videos' },
  ];

export const Links : FunctionComponent = () => {
    
    return (
        <div className="flex sm:justify-around justify-between items-center mt-4" >
            {links.map(({url, text}, index: number) => (
                <NavLink  to={url} className='m-2 mb-0' key={index} activeClassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2">
                    {text}
                </NavLink >
            ))}
        </div>
    )
}
