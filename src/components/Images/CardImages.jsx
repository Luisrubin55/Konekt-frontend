import React from 'react'

function CardImages({photo}) {
    
  return (
    <div className='w-full'>
        <div className='w-full'>
            <img 
                src={photo?.urlImage}
                className='w-60 h-60 object-cover object-center rounded-2xl'
            />
        </div>
    </div>
  )
}

export default CardImages