import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../services/invite';

function Test() {
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
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
