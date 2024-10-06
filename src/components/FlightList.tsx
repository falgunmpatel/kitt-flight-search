import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import FlightDetailsCard from '@/components/FlightDetailsCard'
import { ArrowLeft } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import FlightInfoCard from './FlightInfoCard'

interface Flight {
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

interface FlightListProps {
  flights: Flight[][]
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => (
  <div className='mx-[72px]'>
    <div className='text-left mb-4'>
      <p className='text-muted-foreground'>Showing 356 of 767 results.</p>
    </div>
    <Sheet>
      {flights.map((flightGroup, index) => (
        <FlightCard key={index} flightGroup={flightGroup} />
      ))}
      <FlightDetailModal />
    </Sheet>
  </div>
)

interface FlightCardProps {
  flightGroup: Flight[]
}

const FlightCard: React.FC<FlightCardProps> = ({ flightGroup }) => (
  <SheetTrigger className='w-full'>
    <div className='rounded-md border overflow-hidden hover:cursor-pointer mb-4 w-full flex'>
      <div className='flex flex-col gap-2 flex-1'>
        {flightGroup.map((flight, index) => (
          <FlightInfoCard key={index} {...flight} />
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
)

const FlightDetailModal: React.FC = () => (
  <SheetContent className='min-w-[659px] w-[659px] max-h-[95%] flex flex-col gap-4 my-auto m-4 rounded-md'>
    <div className='rounded-full h-8 w-8 flex items-center justify-center bg-slate-100'>
      <ArrowLeft className='flex-none' />
    </div>
    <h1 className='text-xl font-bold'>Flight Details</h1>
    <Separator />
    <FlightDetailsCard />
  </SheetContent>
)

export default FlightList
