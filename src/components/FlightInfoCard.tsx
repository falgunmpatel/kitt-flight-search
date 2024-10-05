import React from 'react'
import EmiratesLogo from '@/public/emirates.png'
import LufthansaLogo from '@/public/lufthansa.png'
import Image from 'next/image'

interface FlightInfoCardProps {
  logo: string
  date: string
  airline: string
  flightNumber: string
  departureTime: string
  arrivalTime: string
  from: string
  to: string
  duration: string
  stops: string
  noOfStops: number
}

const FlightInfoCard = ({
  logo,
  date,
  airline,
  flightNumber,
  departureTime,
  arrivalTime,
  from,
  to,
  duration,
  stops,
  noOfStops,
}: FlightInfoCardProps) => {
  return (
    <div className='flex flex-row'>
      <div className='flex-1 p-4'>
        <div className='text-sm font-medium text-muted-foreground text-start'>
          {date}
        </div>
        <div className='flex flex-col md:flex-row gap-48 items-center justify-between'>
          <div className='flex items-center'>
            <div className='w-[44px] h-[44px] flex flex-col items-center justify-center border rounded-sm mr-4'>
              <Image
                src={logo === 'EmiratesLogo' ? EmiratesLogo : LufthansaLogo}
                alt='Emirates Logo'
                className='p-1'
                height={42}
                width={42}
              />
            </div>
            <div>
              <p className='tracking-wide text-xs text-muted-foreground font-normal text-left'>
                {airline} • {flightNumber}
              </p>
              <p className='block text-lg leading-tight font-medium text-black'>
                {departureTime} - {arrivalTime}
              </p>
            </div>
          </div>

          <div className='flex min-w-[35%] gap-16'>
            <div className='flex flex-col justify-center'>
              <p className='tracking-wide text-sm font-normal text-muted-foreground'>
                {from} - {to}
              </p>
              <p className='block text-lg font-medium text-black'>{duration}</p>
            </div>

            <div className='flex flex-col justify-start items-start'>
              <span className='text-xs text-muted-foreground'>
                {stops ? stops : <>&nbsp;</>}
              </span>
              <span className='inline-block font-medium text-end text-lg'>
                {noOfStops ? `${noOfStops} stops` : 'No Stop'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightInfoCard
