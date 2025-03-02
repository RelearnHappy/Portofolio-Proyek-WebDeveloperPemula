"use client"

import { useState, useEffect } from "react"
import { getImsyakiyahSchedule } from "@/lib/prayer-times"
import { formatDate } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

export function ImsyakiyahTable() {
  const [schedule, setSchedule] = useState<any[]>([])
  const [filteredSchedule, setFilteredSchedule] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const imsyakiyahData = getImsyakiyahSchedule()
    setSchedule(imsyakiyahData)
    setFilteredSchedule(imsyakiyahData)
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSchedule(schedule)
    } else {
      const filtered = schedule.filter(
        (day) =>
          formatDate(day.date).toLowerCase().includes(searchTerm.toLowerCase()) ||
          day.hijriDate.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredSchedule(filtered)
    }
  }, [searchTerm, schedule])

  return (
    <div>
      <Input
        type="search"
        placeholder="Cari tanggal..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tanggal</TableHead>
            <TableHead>Ramadhan</TableHead>
            <TableHead>Imsak</TableHead>
            <TableHead>Subuh</TableHead>
            <TableHead>Maghrib</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSchedule.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(day.date)}</TableCell>
              <TableCell>{day.hijriDate}</TableCell>
              <TableCell>{day.imsak}</TableCell>
              <TableCell>{day.fajr}</TableCell>
              <TableCell>{day.maghrib}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

