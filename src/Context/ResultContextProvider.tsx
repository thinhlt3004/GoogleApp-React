import React, {createContext, ReactNode, useReducer, useState} from 'react';
import { ResultReducer } from '../Reducer/ResultReducer';
import { ResultActionType } from '../Reducer/type';

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';
const {FETCH_SEARCH_PROCESS, FETCH_SEARCH_SUCCESS, FETCH_NEWS_SUCCESS,FETCH_IMAGES_SUCCESS} = ResultActionType;
interface ResultContextProps {
    children : ReactNode;
}

export interface ISearchResult {
    description: string;
    link: string;
    title: string;
    additional_links: [
        {
            text: string,
            href: string,
        }
    ];
    cite:[
        {
            domain: string;
            span: string;
        }
    ],
}

export interface INewsResult{
    guidislink: boolean;
    id: string;
    links: [
        {
            href: string,
            rel: string,
            type: string
        }
    ];
    published: string;
    published_parsed: number[];
    source: {
        href: string,
        title: string,
    };
    sub_articles: any[];
    summary: string;
    summary_detail: {
        base: string;
        language: string | null;
        type: string;
        value: string;
    };
    title: string;
    title_detail: {
        base: string;
        language: string | null;
        type: string;
        value: string;
    }
}
export interface IImageResult{
    image: {
        alt: string;
        src: string;
    },
    link:{
        domain: string;
        href: string;
        title: string;
    }
}


export interface IInitialProps {
    results : ISearchResult[];
    answers : string[];
    image_results: IImageResult[];
    total: number;
    isLoading: boolean;
    entries: INewsResult[];
    ts:number;
}


const ResultDefaultsData : IInitialProps = {
    results : [],
    answers : [],
    image_results : [],
    total : 0,
    isLoading: false,
    entries : [],
    ts: 0,
}

interface ResultContextDefaultProps{
    resultProps : IInitialProps;
    getResults: (type: string) => void;
    searchTerm: string;
    setSearchTerm: (text: string) => void;  
}

export const ResultContext = createContext<ResultContextDefaultProps>({
    resultProps : ResultDefaultsData,
    getResults : () => {},
    searchTerm: '',
    setSearchTerm: () => {},
});

export const ResultContextProvider = ({children} : ResultContextProps) => {
    const [resultState, dispatch] = useReducer(ResultReducer, ResultDefaultsData);
    const [searchTerm, setSearchTerm] = useState<string>('Elon Musk');
    const getResults = async (type: string) => {
        // setIsLoading(true);
        dispatch({type: FETCH_SEARCH_PROCESS});
        const response = await fetch(`${baseUrl}${type}`,{
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY as string,
            }
        });
        const data = await response.json();
        // console.log(data);
        if(type.includes('/news')){
            dispatch({type: FETCH_NEWS_SUCCESS, payload : data.entries});
        }else if(type.includes('/images')){
            dispatch({type: FETCH_IMAGES_SUCCESS, payload : data});
        }else{
            dispatch({type: FETCH_SEARCH_SUCCESS, payload: data});
        }
    }

    const setSearchTermFunction = (text: string) => {
        setSearchTerm(text);
    }
    const resultContextData : ResultContextDefaultProps = {
        resultProps : resultState,
        getResults: getResults,
        searchTerm: searchTerm,
        setSearchTerm : setSearchTermFunction
    }
    return(
        <ResultContext.Provider value={resultContextData}>
            {children}
        </ResultContext.Provider>
    )

}