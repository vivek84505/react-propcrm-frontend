import React from 'react'
import { Spinner } from 'reactstrap'

const Loader = () =>{
    return(
        <div className='text-center- mt-4'>
            <Spinner color="primary"></Spinner>
            <p>Loading...</p>
        </div>
    )
}


export default Loader;