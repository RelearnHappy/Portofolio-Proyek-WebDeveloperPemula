import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PrayerTimesLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-14" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

