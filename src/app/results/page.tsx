'use client'

import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import FlightSearchForm from '@/components/forms/FlightSearchForm'
import FlightInfoCard from '@/components/FlightInfoCard'
import FlightDetailsCard from '@/components/FlightDetailsCard'

const flights = [
  [
    {
      logo: 'EmiratesLogo',
      date: '',
      airline: 'Emirates',
      flightNumber: 'AT 4334',
      departureTime: '9:45 AM',
      arrivalTime: '11:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '2h 10m',
      stops: '',
      noOfStops: 0,
    },
    {
      logo: 'LufthansaLogo',
      date: '',
      airline: 'Luftahnasa',
      flightNumber: 'AT 4334',
      departureTime: '11:45 PM',
      arrivalTime: '6:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '7h 10m',
      stops: '6h 32m in Lisbon, P...',
      noOfStops: 0,
    },
  ],
  [
    {
      logo: 'EmiratesLogo',
      date: 'Thu 25 Jan',
      airline: 'Emirates',
      flightNumber: 'AT 4334',
      departureTime: '9:45 AM',
      arrivalTime: '11:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '7h 10m',
      stops: '',
      noOfStops: 1,
    },
    {
      logo: 'EmiratesLogo',
      date: 'Sat 2 Jul',
      airline: 'Emirates',
      flightNumber: 'AT 4334',
      departureTime: '9:45 AM',
      arrivalTime: '11:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '19h 10m',
      stops: 'Lisbon',
      noOfStops: 1,
    },
  ],
  [
    {
      logo: 'LufthansaLogo',
      date: 'Thu 25 Jan',
      airline: 'Luftahnasa',
      flightNumber: 'AT 4334',
      departureTime: '9:45 AM',
      arrivalTime: '11:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '7h 10m',
      stops: '',
      noOfStops: 0,
    },
    {
      logo: 'LufthansaLogo',
      date: 'Thu 25 Jan',
      airline: 'Luftahnasa',
      flightNumber: 'AT 4334',
      departureTime: '11:45 PM',
      arrivalTime: '6:45 AM',
      from: 'CDG',
      to: 'DXB',
      duration: '4h 10m',
      stops: '',
      noOfStops: 0,
    },
  ],
]

const ResultPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const fromAirport = {
    code: searchParams.get('from')?.split('  ')[0],
    name: searchParams.get('from')?.split('  ')[1],
    city: searchParams.get('from')?.split('  ')[2],
    country: searchParams.get('from')?.split('  ')[3],
  }

  const toAirport = {
    code: searchParams.get('to')?.split('  ')[0],
    name: searchParams.get('to')?.split('  ')[1],
    city: searchParams.get('to')?.split('  ')[2],
    country: searchParams.get('to')?.split('  ')[3],
  }

  console.log(searchParams.get('from'))
  console.log(searchParams.get('to'))
  console.log(fromAirport)

  let departureDate = new Date(
    searchParams.get('departureDate')!,
  ).toDateString()
  departureDate =
    departureDate.split(' ')[1] + ' ' + departureDate.split(' ')[2]

  let returnDate = new Date(searchParams.get('returnDate')!).toDateString()
  returnDate = returnDate.split(' ')[1] + ' ' + returnDate.split(' ')[2]

  return (
    <div>
      <header className='h-[106px] px-[192px] w-full flex items-center justify-between border-b'>
        <Sheet>
          <SheetTrigger className='hover:cursor-pointer'>
            <div className='max-w-[662px] h-[50px] w-full rounded-full border flex items-center justify-between p-2 '>
              <div className='w-[35%] line-clamp-1 px-2 space-x-1'>
                <span className='text-md font-bold'>{fromAirport.code}</span>
                <span className='text-md text-muted-foreground'>
                  {fromAirport.name} {fromAirport.city},{fromAirport.country}
                </span>
              </div>{' '}
              <Separator orientation='vertical' />
              <div className='w-[35%] line-clamp-1 px-2 space-x-1'>
                <span className='text-md font-bold'>{toAirport.code}</span>
                <span className='text-md text-muted-foreground'>
                  {toAirport.name} {toAirport.city},{toAirport.country}
                </span>
              </div>{' '}
              <Separator orientation='vertical' />
              <div className='font-semibold px-2'>
                {departureDate}
                &nbsp;&#45;&nbsp;
                {returnDate}
              </div>
              <Separator orientation='vertical' />
              <div className='rounded-full bg-slate-100 ml-2 mr-1'>
                <Search className='flex-0 p-[9px]' size={36} />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side={'top'} className='pt-[68px] px-[219px]'>
            <FlightSearchForm
              whereFrom={fromAirport.name}
              whereTo={toAirport.name}
              departureDate={departureDate}
              returnDate={returnDate}
            />
          </SheetContent>
        </Sheet>

        <div
          className='rounded-full flex items-center justify-center border justify-self-end hover:cursor-pointer'
          onClick={() => router.push('/search')}
        >
          <X className='flex-0 p-2 ' size={40} />
        </div>
      </header>
      <div className='max-w-[1200px] mt-[36px] mx-auto'>
        <div className='mx-[72px]'>
          <div className='text-left mb-4'>
            <p className='text-muted-foreground'>Showing 356 of 767 results.</p>
          </div>
          <Sheet>
            {flights.map((flight, index) => (
              <SheetTrigger
                key={flight[0].flightNumber + index}
                className='w-full'
              >
                <div className='rounded-md border overflow-hidden hover:cursor-pointer mb-4 w-full flex'>
                  <div className='flex flex-col gap-2 flex-1'>
                    {flight.map((f, index) => (
                      <FlightInfoCard
                        key={f.flightNumber + index}
                        logo={f.logo}
                        date={f.date}
                        airline={f.airline}
                        flightNumber={f.flightNumber}
                        departureTime={f.departureTime}
                        arrivalTime={f.arrivalTime}
                        from={f.from}
                        to={f.to}
                        duration={f.duration}
                        stops={f.stops}
                        noOfStops={f.noOfStops}
                      />
                    ))}
                  </div>
                  <div className='flex flex-col justify-end items-start border-l p-4'>
                    <p className='text-sm text-muted-foreground'>from</p>
                    <p className='text-lg mb-2'>AED 2456.90</p>
                    <div className='p-12 py-2 bg-green-950 text-white font-medium rounded-md w-[182px] h-[40px]'>
                      Select
                    </div>
                  </div>
                </div>
              </SheetTrigger>
            ))}
            <SheetContent className='min-w-[659px] w-[659px] max-h-[95%] flex flex-col gap-4 my-auto m-4 rounded-md'>
              <div className='rounded-full h-8 w-8 flex items-center justify-center bg-slate-100'>
                <ArrowLeft className='flex-none' />
              </div>
              <h1 className='text-xl font-bold'>Flight Details</h1>
              <Separator />
              <div className=''>
                <FlightDetailsCard />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
