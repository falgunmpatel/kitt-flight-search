import { Clock } from 'lucide-react'
import React from 'react'
import EmiratesLogo from '@/public/emirates.png'
import LufthansaLogo from '@/public/lufthansa.png'
import Image from 'next/image'

const flightDetails = {
  stops: [
    {
      from: 'DXB • Dubai International Airport',
      to: 'RUH • King Khalid International Airport',
      airline: {
        logo: 'EmiratesLogo',
        name: 'Saudi Arabian Airlines',
        flightNumber: 'SV553',
        class: 'Economy',
        code: 'A330',
        duration: '3h 45min',
      },
      date: 'Sat 28 Sept',
      time: '2:15',
    },
    {
      from: 'RUH • King Khalid International Airport',
      to: 'CDG • Paris - Charles De Gualle Airport',
      airline: {
        logo: 'EmiratesLogo',
        name: 'Saudi Arabian Airlines',
        flightNumber: 'SV553',
        class: 'Economy',
        code: 'A330',
        duration: '3h 45min',
      },
      date: 'Sat 28 Sept',
      time: '2:15',
    },
  ],
}

const FlightDetailsCard = () => {
  const lastIndex = flightDetails.stops.length - 1

  return (
    <div className=''>
      {flightDetails.stops.map((stop, index) => (
        <div
          key={stop.airline.flightNumber + index}
          className='flex flex-col items-start'
        >
          <div className='flex justify-between w-full'>
            <div className='text-xs'>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full border border-black'></div>
                <span className='text-muted-foreground'>
                  {stop.date} • {stop.time}
                </span>
              </div>
              <div className='flex gap-2 border-l border-black h-16 px-4 ml-1'>
                <span className='font-semibold'>{stop.from}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full border border-black'></div>
                <span className='text-muted-foreground'>
                  {stop.date} • {stop.time}
                </span>
              </div>
              <div
                className={`flex gap-2 px-4 ml-1 ${index !== lastIndex && 'border-l border-dashed border-black'}`}
              >
                <span className='font-semibold'>{stop.to}</span>
              </div>
            </div>
            <div className='flex items-start self-center'>
              <div className='w-[28px] h-[28px] flex items-center justify-center border rounded-sm mr-4'>
                <Image
                  src={
                    stop.airline.logo === 'EmiratesLogo'
                      ? EmiratesLogo
                      : LufthansaLogo
                  }
                  alt='Emirates Logo'
                  width={40}
                />
              </div>
              <div>
                <p className='tracking-wide text-xs font-normal text-left'>
                  {stop.airline.name} • {stop.airline.flightNumber} <br />
                  {stop.airline.class} • {stop.airline.code} <br />
                  Flight time {stop.airline.duration}
                </p>
              </div>
            </div>
          </div>
          {index !== lastIndex && (
            <div className='flex items-center justify-center text-muted-foreground text-sm h-32 ml-1 mt-1 border-l border-dashed border-black w-[45%]'>
              <Clock size={12} /> &nbsp;
              <span className=''>Layover 3h 45min</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FlightDetailsCard
