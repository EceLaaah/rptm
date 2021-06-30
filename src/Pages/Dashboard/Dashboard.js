import React from 'react';
import {Card} from '../../components'

const Dashboard = () => {

    const riceDetails = [
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            id: 1,
            image : "/image/pictureExample.jpg",
            kilograms : "100kg",
            price : "17/kg",
            title : "Jasmine Rice",
            name : "Jose Mari Batumbakal",
            description : `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
    ]

    return(
        <div className="max-w-content mx-auto px-4 bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center">
                {riceDetails.map((type) => (
                    <Card key={type.key} image={type.image} kilograms={type.kilograms} price={type.price} title={type.title} name={type.name} description={type.description}/>
                ))}
            </div>  
        </div>
    )
}

export default Dashboard;