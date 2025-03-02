"use client"

import { useEffect, useState } from "react"
import { getPrayerTimes } from "@/lib/prayer-times"
import { formatTime } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Sunrise, Sun, Sunset, Moon, Star } from "lucide-react"

export function PrayerTimesDisplay({ date = new Date() }: { date?: Date }) {
  const [prayerTimes, setPrayerTimes] = useState<any>(null)

  useEffect(() => {
    const times = getPrayerTimes(date)
    setPrayerTimes(times)
  }, [date])

  if (!prayerTimes) {
    return <div>Loading prayer times...</div>
  }

  const prayerCards = [
    { name: "Subuh", time: prayerTimes.fajr, icon: <Star className="h-6 w-6 text-blue-600" /> },
    { name: "Terbit", time: prayerTimes.sunrise, icon: <Sunrise className="h-6 w-6 text-orange-500" /> },
    { name: "Dzuhur", time: prayerTimes.dhuhr, icon: <Sun className="h-6 w-6 text-yellow-500" /> },
    { name: "Ashar", time: prayerTimes.asr, icon: <Sun className="h-6 w-6 text-amber-500" /> },
    { name: "Maghrib", time: prayerTimes.maghrib, icon: <Sunset className="h-6 w-6 text-red-500" /> },
    { name: "Isya", time: prayerTimes.isha, icon: <Moon className="h-6 w-6 text-indigo-500" /> },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {prayerCards.map((prayer) => (
        <Card key={prayer.name}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {prayer.icon}
                <span className="font-medium text-gray-800 dark:text-gray-100">{prayer.name}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{formatTime(prayer.time)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

