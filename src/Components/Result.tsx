import React, { FunctionComponent, useEffect, useContext } from 'react'
import {useLocation} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { ResultContext } from '../Context/ResultContextProvider';
import { Loading } from './Loading';
import {ISearchResult, IImageResult, INewsResult} from './../Context/ResultContextProvider';
export const Result : FunctionComponent = () => {
    const {resultProps, getResults, searchTerm} = useContext(ResultContext);
    const location = useLocation(); //images, news, etc...
    // console.log(location);
    useEffect(() => {
        // console.log(location.pathname);
        if(searchTerm !== '') {
            if(location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`); 
            }else{
                getResults(`${location.pathname}/q=${searchTerm}&num=60`); 
            }
        }
    },[searchTerm, location])
    // console.log(resultProps);

    if(resultProps.isLoading) return <div className="min-w-screen flex justify-center"><Loading/></div>;
    switch (location.pathname) {
        case '/search':
            return (
                <div  className=" flex flex-wrap justify-between space-y-6 sm:px-56">
                    {resultProps?.results?.length > 0 && resultProps?.results?.map((i : ISearchResult, index: number) => (
                       <div key={index} className='md:w-2/5 w-full'>
                           <a href={i.link} target="_blank" rel="noreferrer">
                               <p className="text-sm">
                                   {i.link.length > 30 ? i.link.substring(0, 30) + '...' : i.link} 
                               </p>
                               <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                                   {i.title}
                               </p>
                               <p>{i.description}</p>
                           </a>
                       </div> 
                    ))}
                </div>
            );    
        case '/images':
            return( <div className='flex flex-wrap justify-center items-center'>
                {resultProps?.image_results?.length > 0 && resultProps?.image_results?.map((i : IImageResult, index: number) => (
                      <a key={index} className='sm:p-3 p-5' href={i.link.href} target='_blank' rel='noreferrer'>
                          <img src={i.image?.src} alt={i.image.alt} loading='lazy' />
                          <p className='w-36 break-words text-sm mt-2'>
                              {i.link.title}
                          </p>
                      </a>
                    ))}
            </div>)
        case '/news':
            return (
                <div className='sm:px-56 flex flex-wrap justify-between items-center space-y-6'>
                    {resultProps?.entries.length > 0 && resultProps?.entries.map((i : INewsResult, index: number) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={i.links[0].href} target="_blank" rel='noreferrer' className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {i.title}
                                </p>
                            </a>
                            <div className='flex gap-4'>
                                <a href={i.source?.href} target="_blank" rel='noreferrer' className="hover:underline hover:text-blue-300">
                                    {i.source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )
        case '/videos':
            return (
                <div className='flex flex-wrap'>
                    {resultProps?.results.length > 0 && resultProps?.results?.map((i : ISearchResult, index: number) => (
                        <div key={index} className='p-2'>
                            {i?.additional_links[0]?.href && <ReactPlayer url={i?.additional_links[0]?.href} controls width='355px' height='200px' />}
                        </div>
                    ))}
                </div>
            )
        default:
            return (
                <span>ERROR...</span>
        );
    }
}
