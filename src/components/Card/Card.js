import React from 'react';

const Card = ({image, kilograms, price, title, name, description, key}) => {
    return(
        <div key={key} className="bg-white shadow-sm w-80 max-w-sm rounded-lg w-auto">
        <div className="object-cover w-full h-56 rounded-t-lg bg-cover bg-center relative" style={{backgroundImage : `url(${image})`}}>
            <span className="absolute top-2 left-2 rounded-full py-4 px-2 bg-primary text-white font-semibold text-sm">{price}</span>
        </div>
        <div className="py-2 px-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{title}</h1>
                <h2 className="text-sm text-gray-400">{kilograms}</h2>
            </div>
            <section>
                <span className="text-sm text-gray-400">{name}</span>
                <div className="text-sm text-gray-400 my-2" dangerouslySetInnerHTML={{__html : description}}/>
               <div className="text-right">
                <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">Bid</button>
               </div>
            </section>
        </div>
        </div> 
    )
}

export default Card;