import { PrayerTimes, Coordinates, CalculationMethod, type PrayerTimesOptions } from "adhan"

// Coordinates for Kabupaten Subang, Jawa Barat, Indonesia
const coordinates = new Coordinates(-6.5711, 107.7539)

// Use the Ministry of Religious Affairs of Indonesia calculation method
const calculationMethod = CalculationMethod.INDONESIA_MINISTRY_OF_RELIGIOUS_AFFAIRS
const calculationParams = calculationMethod()

export function getPrayerTimes(date: Date = new Date()): any {
  const options: PrayerTimesOptions = {
    coordinates: coordinates,
    date: date,
    calculationParameters: calculationParams,
  }

  const prayerTimes = new PrayerTimes(options)

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  }
}

export function getNextPrayer(): { name: string; time: Date } | null {
  const now = new Date()
  const prayerTimes = getPrayerTimes(now)

  const prayers = [
    { name: "Subuh", time: prayerTimes.fajr },
    { name: "Dzuhur", time: prayerTimes.dhuhr },
    { name: "Ashar", time: prayerTimes.asr },
    { name: "Maghrib", time: prayerTimes.maghrib },
    { name: "Isya", time: prayerTimes.isha },
  ]

  for (const prayer of prayers) {
    if (prayer.time > now) {
      return prayer
    }
  }

  // If all prayers for today have passed, get the first prayer for tomorrow
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowPrayers = getPrayerTimes(tomorrow)

  return { name: "Subuh", time: tomorrowPrayers.fajr }
}

export function getImsyakiyahSchedule(): any[] {
  const ramadanStart = new Date(2024, 2, 11) // Estimated start of Ramadan 1445 H
  const schedule = []

  for (let i = 0; i < 30; i++) {
    const date = new Date(ramadanStart)
    date.setDate(ramadanStart.getDate() + i)

    const prayerTimes = getPrayerTimes(date)

    const imsakTime = new Date(prayerTimes.fajr)
    imsakTime.setMinutes(imsakTime.getMinutes() - 10)

    schedule.push({
      date: date,
      hijriDate: `${i + 1} Ramadhan 1445 H`,
      imsak: formatTimeString(imsakTime),
      fajr: formatTimeString(prayerTimes.fajr),
      maghrib: formatTimeString(prayerTimes.maghrib),
    })
  }

  return schedule
}

function formatTimeString(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

