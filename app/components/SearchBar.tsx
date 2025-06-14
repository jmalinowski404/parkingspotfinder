'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, ListFilterPlus, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export default function SearchBar() {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(
        new Date("2025-06-01")
    )
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(formatDate(date))
    const [valueSlider, setValueSlider] = useState<number[]>([33])

    return (
        <>
            <div className='h-sm bg-white rounded-[14px] p-4 shadow-lg'>
                <div className='flex flex-row gap-6'>
                    <MapPin className='size-6' />
                    <input className="w-md h-sm appearance-none focus:outline-none" placeholder="Where do you need to park?" />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            id="date-picker"
                            variant="ghost"
                            className="size-6"
                            >
                            <CalendarIcon className='size-6' />
                            <span className="sr-only">Select date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                        >
                            <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                setDate(date)
                                setValue(formatDate(date))
                                setOpen(false)
                            }}
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <ListFilterPlus />
                        </PopoverTrigger>
                        <PopoverContent className='grid grid-cols-2 gap-3'>
                            {/* Type Of Parking */}
                            <div id='type' className='flex flex-col gap-2'>
                                <Label className='text-base font-bold'>Type</Label>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Garage</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Street Parking</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Surface Parking</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Underground Parking</Label>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div id='amenities' className='flex flex-col gap-2'>
                                <Label className='text-base font-bold'>Amenities</Label>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>EV Charging</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Handicap Accessible</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Security/CCTV</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Covered Parking</Label>
                                </div>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Pre-booking available</Label>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div id='price' className='flex flex-col gap-2'>
                                <Label className='text-base font-bold'>Price per hour</Label>
                                <div id='min-max' className='flex flex-row gap-2'>
                                    <Input />
                                    <Label> - </Label>
                                    <Input />
                                </div>
                                <div id='freeOption' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Free Parking</Label>
                                </div>
                            </div>

                            {/* Distance */}
                            <div id='distance' className='flex flex-col gap-2'>
                                <Label className='text-base font-bold'>Distance</Label>
                                <Label>{valueSlider} km</Label>
                                <Slider value={valueSlider} onValueChange={setValueSlider} max={100} step={1} />
                            </div>

                            {/* Availability */}
                            <div id='availability' className='flex flex-col gap-2'>
                                <Label className='text-base font-bold'>Availability</Label>
                                <div id='option' className='flex flex-row gap-2'>
                                    <Checkbox />
                                    <Label>Show only available</Label>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    )
}