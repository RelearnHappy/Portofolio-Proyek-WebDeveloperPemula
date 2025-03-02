import { Suspense } from "react"
import Link from "next/link"
import { ChurchIcon as MosqueIcon, Clock } from "lucide-react"
import { ImsyakiyahTable } from "@/components/imsyakiyah-table"
import { ImsyakiyahLoader } from "@/components/imsyakiyah-loader"

export default function ImsyakiyahPage() {
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
                href="/"
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
              >
                <Clock className="h-4 w-4" />
                <span>Jadwal Sholat</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Jadwal Imsyakiyah Ramadhan 1445 H / 2024 M
              </h2>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Kabupaten Subang, Jawa Barat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Jadwal imsak dan berbuka puasa selama bulan Ramadhan untuk wilayah Kabupaten Subang dan sekitarnya.
                </p>
              </div>

              <Suspense fallback={<ImsyakiyahLoader />}>
                <ImsyakiyahTable />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

