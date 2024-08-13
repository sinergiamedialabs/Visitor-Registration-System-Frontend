import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useMasterApiQuery } from '../services/invite';

function Test() {
    const { data, error, isLoading } = useMasterApiQuery()
    useEffect(() => {
        console.log("data", data)
    }, [data])
    
    return(
        <div>
            Test
        </div>
    )
}

export default Test;
