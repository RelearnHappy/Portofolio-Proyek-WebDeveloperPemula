"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

export function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    // Refresh the page with the new date
    if (selectedDate) {
      const dateParam = format(selectedDate, "yyyy-MM-dd")
      router.push(`/?date=${dateParam}`)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "EEEE, dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus locale={id} />
      </PopoverContent>
    </Popover>
  )
}

