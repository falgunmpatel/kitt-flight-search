'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import FlightSearchForm from '@/components/forms/FlightSearchForm'
import { Loader, Search, X } from 'lucide-react'

interface AirportInfo {
  code: string
  name: string
  city: string
  country: string
}

const SearchHeader: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const [fromAirport, setFromAirport] = useState<AirportInfo>({
    code: '',
    name: '',
    city: '',
    country: '',
  })

  const [toAirport, setToAirport] = useState<AirportInfo>({
    code: '',
    name: '',
    city: '',
    country: '',
  })

  const [departureDate, setDepartureDate] = useState<string>('')
  const [returnDate, setReturnDate] = useState<string>('')

  useEffect(() => {
    setFromAirport(parseAirportInfo(searchParams.get('from')))
    setToAirport(parseAirportInfo(searchParams.get('to')))
    setDepartureDate(formatDate(searchParams.get('departureDate')))
    setReturnDate(formatDate(searchParams.get('returnDate')))
    setLoading(false)
  }, [searchParams])

  const handleSearchClick = () => {
    router.push('/search')
  }

  if (loading) return <Loader className='mx-auto w-full items-center' />

  return (
    <header className='h-[106px] px-[192px] w-full flex items-center justify-between border-b'>
      <Sheet>
        <SheetTitle className='hidden'>Search Flights</SheetTitle>
        <SheetTrigger className='hover:cursor-pointer'>
          <div className='max-w-[662px] h-[50px] w-full rounded-full border flex items-center justify-between p-2'>
            <AirportInfoComponent airport={fromAirport} />
            <Separator orientation='vertical' />
            <AirportInfoComponent airport={toAirport} />
            <Separator orientation='vertical' />
            <div className='font-semibold px-2'>
              {departureDate.slice(0, departureDate.length - 5)}{' '}
              &nbsp;&#45;&nbsp; {returnDate.slice(0, returnDate.length - 5)}
            </div>
            <Separator orientation='vertical' />
            <div className='rounded-full bg-slate-100 ml-2 mr-1'>
              <Search className='flex-0 p-[9px]' size={36} />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          side={'top'}
          className='pt-[40px] md:pt-[68px] px-[40px] md:px-[140px] lg:px-[219px]'
        >
          <FlightSearchForm
            whereFrom={fromAirport.name}
            whereTo={toAirport.name}
            departureDate={departureDate}
            returnDate={returnDate}
          />
        </SheetContent>
      </Sheet>
      <div
        className='rounded-full flex items-center justify-center border hover:cursor-pointer'
        onClick={handleSearchClick}
      >
        <X className='flex-0 p-2' size={40} />
      </div>
    </header>
  )
}

const AirportInfoComponent: React.FC<{ airport: AirportInfo }> = ({
  airport,
}) => (
  <div className='w-[35%] line-clamp-1 px-2 space-x-1'>
    <span className='text-md font-bold'>{airport.code}</span>
    <span className='text-md text-muted-foreground'>
      {airport.name} {airport.city}, {airport.country}
    </span>
  </div>
)

const parseAirportInfo = (airportStr: string | null): AirportInfo => {
  if (!airportStr) {
    return { code: '', name: '', city: '', country: '' } // Default values for invalid input
  }

  const parts = airportStr.split('  ')
  return {
    code: parts[0] || '',
    name: parts[1] || '',
    city: parts[2] || '',
    country: parts[3] || '',
  }
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default SearchHeader
