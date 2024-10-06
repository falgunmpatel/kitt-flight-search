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

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({
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
}) => {
  const renderLogo = () => (
    <Image
      src={logo === 'EmiratesLogo' ? EmiratesLogo : LufthansaLogo}
      alt={`${airline} Logo`}
      className='p-1'
      height={42}
      width={42}
    />
  )

  return (
    <div className='flex p-4'>
      <div className='flex-1'>
        <div className='text-sm text-left font-medium text-muted-foreground'>
          {date}
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between gap-48'>
          <div className='flex items-center'>
            <div className='w-[44px] h-[44px] flex items-center justify-center border rounded-sm mr-4'>
              {renderLogo()}
            </div>
            <div>
              <p className='tracking-wide text-xs font-normal text-muted-foreground text-left'>
                {airline} • {flightNumber}
              </p>
              <p className='text-lg font-medium text-black'>
                {departureTime} - {arrivalTime}
              </p>
            </div>
          </div>

          <div className='flex min-w-[35%] gap-16'>
            <div className='flex flex-col'>
              <p className='tracking-wide text-xs text-muted-foreground'>
                {from} - {to}
              </p>
              <p className='text-lg font-medium text-black'>{duration}</p>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-xs text-muted-foreground'>
                {stops || '\u00A0'}
              </span>
              <span className='text-lg font-medium'>
                {noOfStops
                  ? `${noOfStops} stop${noOfStops > 1 ? 's' : ''}`
                  : 'Non-stop'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightInfoCard
