import { DollarSign, PartyPopper, ShoppingBag, User2 } from 'lucide-react'
import React from 'react'
import DataCard from './DataCard'

export default function Cards() {
    const cards = [
        { cardTitle: 'Total Revenue', number: '+1000.00', mutedText: 'Based on 100 Charges', icon: <DollarSign className='h-4 w-4' /> },
        { cardTitle: 'Total Sales', number: '57', mutedText: 'Total Sale on ShoeMarshel', icon: <ShoppingBag className='h-4 w-4' /> },
        { cardTitle: 'Total Products', number: '32', mutedText: 'Total Products Created', icon: <PartyPopper className='h-4 w-4' /> },
        { cardTitle: 'Total Users', number: '23', mutedText: 'Total Users Register', icon: <User2 className='h-4 w-4' /> }
    ]
    return (
        <div className="grid  gap-4 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4 ">
            {cards.map((card, index) => (
                <DataCard key={index} {...card} />
            ))}
        </div>
    )
}
