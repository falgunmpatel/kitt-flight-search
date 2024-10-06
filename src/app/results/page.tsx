'use client'
import { Suspense, useEffect, useState } from 'react'
import Loading from './loading'
import SearchHeader from '@/components/SearchHeader'
import FlightList from '@/components/FlightList'
import { Loader } from 'lucide-react'

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

const ResultPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <div>
      <Suspense fallback={<Loader className='mx-auto w-full items-center' />}>
        <SearchHeader />
      </Suspense>
      <div className='max-w-[1200px] mt-[36px] mx-auto'>
        <FlightList flights={flights} />
      </div>
    </div>
  )
}

export default ResultPage
