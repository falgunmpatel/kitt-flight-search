'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { CircleCheck, Loader, Loader2 } from 'lucide-react'
import SearchHeader from '@/components/SearchHeader'
import Plane from '@/public/plane.gif'
import { Progress } from '@/components/ui/progress'
import { Suspense, useState } from 'react'

export default function Loading() {
  const [value, setValue] = useState(0)

  ;(() => {
    setInterval(() => {
      setValue((prev: number) => prev + 10)
    }, 500)
  })()

  return (
    <>
      <Suspense fallback={<Loader className='mx-auto w-full items-center' />}>
        <SearchHeader />
      </Suspense>
      <Progress className='h-1' value={value} />
      <Card className='w-[323px] h-[300px] absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-xl'>
        <CardContent className='flex flex-col items-center'>
          <Image src={Plane} alt='' width={150} height={150} priority />
          <div className='flex flex-col gap-4 text-lg'>
            <p className='flex gap-2 items-center text-slate-400'>
              <CircleCheck className='h-4 w-4 text-green-700' /> Searching 400+
              flights
            </p>
            <p className='flex gap-2 items-center text-slate-400'>
              <CircleCheck className='h-4 w-4 text-green-700' />
              Attaching companies rule
            </p>
            <p className='flex gap-2 items-center'>
              <Loader2 className='h-4 w-4 text-black animate-spin' />
              Serving best results
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
