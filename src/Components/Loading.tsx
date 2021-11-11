import React, { FunctionComponent } from 'react';
import Loader from 'react-loader-spinner';
export const Loading :FunctionComponent = () => {
    return (
        <div className="flex justify-content items-center">
            <Loader type='Puff' color='#00BFFF' height={550} width={80} />
        </div>
    )
}
