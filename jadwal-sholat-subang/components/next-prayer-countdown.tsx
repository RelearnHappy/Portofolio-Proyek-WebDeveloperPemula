"use client"

import { useEffect, useState } from "react"
import { getNextPrayer } from "@/lib/prayer-times"
import { formatTime, formatCountdown } from "@/lib/utils"

export function NextPrayerCountdown() {
  const [nextPrayer, setNextPrayer] = useState<any>(null)
  const [countdown, setCountdown] = useState<string>("")

  useEffect(() => {
    const updateNextPrayer = () => {
      const next = getNextPrayer()
      setNextPrayer(next)
    }

    updateNextPrayer()
    const interval = setInterval(() => {
      if (nextPrayer) {
        const now = new Date()
        const diff = nextPrayer.time.getTime() - now.getTime()

        if (diff <= 0) {
          updateNextPrayer()
        } else {
          setCountdown(formatCountdown(diff))
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [nextPrayer])

  if (!nextPrayer) {
    return <div>Memuat waktu sholat berikutnya...</div>
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-2 md:mb-0">
        <span className="text-gray-600 dark:text-gray-300">Waktu sholat berikutnya:</span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {nextPrayer.name} - {formatTime(nextPrayer.time)}
        </h3>
      </div>
      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
        <span className="text-xl font-mono font-semibold text-green-600 dark:text-green-400">{countdown}</span>
      </div>
    </div>
  )
}

