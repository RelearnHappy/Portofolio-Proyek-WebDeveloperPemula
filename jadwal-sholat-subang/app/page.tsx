import { Suspense } from "react"
import Link from "next/link"
import { ChurchIcon as MosqueIcon, Calendar } from "lucide-react"
import { PrayerTimesDisplay } from "@/components/prayer-times-display"
import { PrayerTimesLoader } from "@/components/prayer-times-loader"
import { NextPrayerCountdown } from "@/components/next-prayer-countdown"
import { DatePicker } from "@/components/date-picker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <header className="bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MosqueIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Jadwal Sholat Subang</h1>
            </div>
            <nav>
              <Link
                href="/imsyakiyah"
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
              >
                <Calendar className="h-4 w-4" />
                <span>Imsyakiyah</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
                  Jadwal Sholat Hari Ini
                </h2>
                <DatePicker />
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 mb-6">
                <Suspense fallback={<div>Memuat waktu sholat berikutnya...</div>}>
                  <NextPrayerCountdown />
                </Suspense>
              </div>

              <Suspense fallback={<PrayerTimesLoader />}>
                <PrayerTimesDisplay />
              </Suspense>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Tentang Jadwal Sholat Kabupaten Subang
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Jadwal sholat ini dihitung berdasarkan koordinat geografis Kabupaten Subang, Jawa Barat, Indonesia.
                Metode perhitungan yang digunakan adalah metode yang direkomendasikan oleh Kementerian Agama Republik
                Indonesia.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

