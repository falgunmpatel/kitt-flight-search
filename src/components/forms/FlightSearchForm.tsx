'use client'
import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

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

const formSchema = z.object({
  from: z.string().min(1, 'From is required'),
  to: z.string().min(1, 'To is required'),
  departure: z.date().refine(date => date > new Date(), {
    message: 'Departure date must be in the future',
  }),
  return: z.date().refine(date => date > new Date(), {
    message: 'Return date must be in the future',
  }),
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
      departure: departureDate ? new Date(departureDate) : undefined,
      return: returnDate ? new Date(returnDate) : undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fromAirport = airports.find(airport => airport.name === values.from)
    const toAirport = airports.find(airport => airport.name === values.to)

    router.push(
      `/results?from=${fromAirport?.code}++${fromAirport?.name}++${fromAirport?.city}++${fromAirport?.country}&to=${toAirport?.code}++${toAirport?.name}++${toAirport?.city}++${toAirport?.country}&departureDate=${values.departure}&returnDate=${values.return}`,
    )
  }

  const renderAirportSelect = (
    field: any,
    label: string,
    placeholder: string,
  ) => (
    <FormItem>
      <FormLabel className='hidden'>{label}</FormLabel>
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className='max-w-sm sm:max-w-md md:max-w-[267.5px] h-[60px] flex gap-4 overflow-auto'>
            <div className='flex gap-4 overflow-hidden items-center'>
              <LocateFixed className='opacity-30 flex-none' size={16} />
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent className='w-full justify-start items-start'>
            {airports.map(airport => (
              <SelectItem
                key={airport.code}
                value={airport.name}
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
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage className='min-h-[1.25rem]' />
    </FormItem>
  )

  const renderDateField = (
    field: any,
    label: string,
    placeholder: string,
    isReturn: boolean = false,
  ) => (
    <FormItem className='flex flex-col'>
      <FormLabel className='hidden'>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              className={cn(
                'max-w-sm sm:max-w-md md:max-w-[177px] h-[60px] pl-3 font-normal items-center justify-start gap-2',
                !field.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className='h-4 w-4 opacity-50' />
              {field.value ? format(field.value, 'PPP') : placeholder}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={field.value}
            onSelect={field.onChange}
            disabled={date =>
              isReturn
                ? date < new Date(form.getValues('departure'))
                : date < new Date()
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage className='min-h-[1.25rem] md:max-w-[177px]' />
    </FormItem>
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-wrap gap-4 items-center max-w-sm sm:max-w-md md:max-w-[1001px] mx-auto w-full'>
          <div className='flex w-full flex-col gap-4 md:flex-row md:items-center max-w-sm sm:max-w-md md:max-w-[616px]'>
            <FormField
              control={form.control}
              name='from'
              render={({ field }) =>
                renderAirportSelect(field, 'From', 'Where from?')
              }
            />
            <ArrowLeftRight
              className='rounded-full p-2 self-center bg-sky-100'
              onClick={() => {
                let temp = form.getValues('from')
                form.setValue('from', form.getValues('to'))
                form.setValue('to', temp)
              }}
              size={44}
            />
            <FormField
              control={form.control}
              name='to'
              render={({ field }) =>
                renderAirportSelect(field, 'To', 'Where to?')
              }
            />
          </div>
          <div className='flex flex-col md:flex-row flex-wrap w-full md:max-w-[366px] gap-4'>
            <FormField
              control={form.control}
              name='departure'
              render={({ field }) =>
                renderDateField(field, 'Departure', 'Departure')
              }
            />
            <FormField
              control={form.control}
              name='return'
              render={({ field }) =>
                renderDateField(field, 'Return', 'Return', true)
              }
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
