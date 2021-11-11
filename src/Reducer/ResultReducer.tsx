import {ResultActionType} from './type';
import {IInitialProps} from './../Context/ResultContextProvider';
const {FETCH_SEARCH_PROCESS, FETCH_SEARCH_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_IMAGES_SUCCESS} = ResultActionType;
type ResultAction = {
    type: ResultActionType,
    payload?:any,
}

export const ResultReducer = (state: IInitialProps, action: ResultAction) => {
    switch (action.type) {
        case FETCH_SEARCH_PROCESS:
            return {
                ...state,
                isLoading : true,
            }
        case FETCH_SEARCH_SUCCESS :
            return {
                ...state, 
                results: action.payload.results,
                answers: action.payload.answers,
                // image_results: action.payload.image_results,
                total: action.payload.total,
                isLoading: false,
            }
        case FETCH_NEWS_SUCCESS: 
            return {
                ...state, 
                entries: action.payload,
                isLoading: false,
            }
        case FETCH_IMAGES_SUCCESS:
            return {
                ...state, 
                // results: action.payload.results,
                // answers: action.payload.answers,
                image_results: action.payload.image_results,
                total: action.payload.total,
                isLoading: false,
            }
        default:
            return state;
    }
}