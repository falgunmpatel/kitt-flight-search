import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import FlightSearchForm from '@/components/forms/FlightSearchForm'

const SearchPage = () => {
  return (
    <div className='max-w-[1200px] ml-[6%] mr-[6%] mx-auto flex flex-col items-center justify-center'>
      <h1 className='text-[36px] mt-28 mb-8'>Good Afternoon, Brian</h1>
      <Card className='max-w-[1057px] w-full'>
        <CardHeader>
          <p className='bg-[#eeeeee] font-semibold rounded-sm px-8 py-2 w-[127px]'>
            Flights
          </p>
        </CardHeader>
        <CardContent>
          <FlightSearchForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchPage
