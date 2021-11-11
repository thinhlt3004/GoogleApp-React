import React, { useState, FunctionComponent, useContext, useEffect } from 'react'
import {Links} from './Links';
import { useDebounce } from 'use-debounce';
import { ResultContext } from '../Context/ResultContextProvider';
export const Search : FunctionComponent = () => {
    const [text, setText] = useState('');
    const {setSearchTerm} = useContext(ResultContext);
    const [debbouceValue] = useDebounce(text, 300);

    useEffect(() => {
        if(debbouceValue){
            setSearchTerm(debbouceValue);
        }
    },[debbouceValue, setSearchTerm])

    return (
        <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3 ">
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
                placeholder='Search Goggl or Type URL'
            />
            {text && <button className='absolute top-1.5 right-4 text-2xl text-gray-500' onClick={(e) => setText('')}>X</button>}
            <Links/>
        </div>
    )
}
