'use client'
import React from 'react'

import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ArrowLeftRight, CalendarIcon, LocateFixed, Search } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import airports from '@/data/airports.json'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  from: z.string().min(1, 'From is required'),
  to: z.string().min(1, 'To is required'),
  departure: z.date().refine(zodDate => {
    return zodDate > new Date()
  }, 'Departure date must be in the future'),
  return: z.date().refine(zodDate => {
    return zodDate > new Date()
  }, 'Return date must be in the future'),
})

interface FlightSearchFormProps {
  whereFrom?: string
  whereTo?: string
  departureDate?: string
  returnDate?: string
}

const FlightSearchForm = ({
  whereFrom,
  whereTo,
  departureDate,
  returnDate,
}: FlightSearchFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: whereFrom || '',
      to: whereTo || '',
      departure: (departureDate && new Date(departureDate)) || undefined,
      return: (returnDate && new Date(returnDate)) || undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const fromAirport = airports.find(airport => airport.name === values.from)
    const toAirport = airports.find(airport => airport.name === values.to)
    router.push(
      `/results?from=${fromAirport?.code}++${fromAirport?.name}++${fromAirport?.city}++${fromAirport?.country}&to=${toAirport?.code}++${toAirport?.name}++${toAirport?.city}++${toAirport?.country}&departureDate=${values.departure}&returnDate=${values.return}`,
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-wrap gap-4 items-center justify-center w-[1001px]'>
          <div className='flex flex-wrap justify-between items-center w-[616px]'>
            <FormField
              control={form.control}
              name='from'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='hidden'>From</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={value => {
                        field.onChange(value)
                      }}
                    >
                      <SelectTrigger className='w-[267.5px] h-[60px] flex gap-4'>
                        <div className='flex gap-4 overflow-hidden items-center'>
                          <LocateFixed
                            className='opacity-30 flex-none'
                            size={16}
                          />
                          <SelectValue placeholder='Where from?' />
                        </div>
                      </SelectTrigger>
                      <SelectContent className='w-full justify-start items-start'>
                        {airports.map(
                          (airport: {
                            code: string
                            name: string
                            city: string
                            country: string
                          }) => (
                            <SelectItem
                              key={airport.code}
                              {...field}
                              value={airport.name}
                              onSelect={() => field.onChange(airport.name)}
                              className='flex flex-col items-start w-full'
                            >
                              <p className='text-sm font-bold flex items-center gap-1'>
                                {airport.code}
                                <span className='text-xs'>{airport.name}</span>
                                <span className='text-xs text-muted-foreground'>
                                  {airport.city}, {airport.country}
                                </span>
                              </p>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ArrowLeftRight className='rounded-full p-2 bg-sky-100' size={44} />
            <FormField
              control={form.control}
              name='to'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='hidden'>To</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={value => {
                        field.onChange(value)
                      }}
                    >
                      <SelectTrigger className='w-[267.5px] h-[60px] flex gap-4'>
                        <div className='flex gap-4 overflow-hidden items-center'>
                          <LocateFixed
                            className='opacity-30 flex-none'
                            size={16}
                          />
                          <SelectValue placeholder='Where to?' />
                        </div>
                      </SelectTrigger>
                      <SelectContent className='w-full justify-start items-start'>
                        {airports.map(
                          (airport: {
                            code: string
                            name: string
                            city: string
                            country: string
                          }) => (
                            <SelectItem
                              key={airport.code}
                              {...field}
                              value={airport.name}
                              onSelect={() => field.onChange(airport.name)}
                              className='flex flex-col items-start w-full'
                            >
                              <p className='text-sm font-bold flex items-center gap-1'>
                                {airport.code}
                                <span className='text-xs'>{airport.name}</span>
                                <span className='text-xs text-muted-foreground'>
                                  {airport.city}, {airport.country}
                                </span>
                              </p>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-wrap w-[366px] justify-between'>
            <FormField
              control={form.control}
              name='departure'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='hidden'>Departure</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[177px] h-[60px] pl-3 font-normal items-center justify-start gap-2',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className='h-4 w-4 opacity-50' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Departure</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='return'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='hidden'>Return</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[177px] h-[60px] pl-3 font-normal items-center justify-start gap-2',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className='h-4 w-4 opacity-50' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Return</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date < new Date(form.getValues('departure'))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type='submit'
          className='w-[249px] h-[48px] self-end bg-green-950 font-semibold'
        >
          <Search size={16} /> &nbsp; Search flights
        </Button>
      </form>
    </Form>
  )
}

export default FlightSearchForm
