import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function ImsyakiyahLoader() {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50 dark:bg-green-900/30">
              <TableHead className="w-[60px] text-center">No</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Ramadhan</TableHead>
              <TableHead className="text-center">Imsak</TableHead>
              <TableHead className="text-center">Subuh</TableHead>
              <TableHead className="text-center">Maghrib</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

