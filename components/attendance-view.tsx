"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, CheckCircle, XCircle, Clock, AlertTriangle, Users } from "lucide-react"

// Mock attendance data
const attendanceData = {
  1: {
    name: "Prakash Kumar",
    overall: {
      present: 78,
      absent: 12,
      late: 8,
      total: 98,
      percentage: 78,
    },
    subjects: [
      {
        name: "Data Structures",
        present: 24,
        absent: 3,
        late: 2,
        total: 29,
        percentage: 83,
        type: "Lecture + Lab",
      },
      {
        name: "Database Systems",
        present: 18,
        absent: 1,
        late: 1,
        total: 20,
        percentage: 90,
        type: "Lecture + Lab",
      },
      {
        name: "Software Engineering",
        present: 15,
        absent: 4,
        late: 1,
        total: 20,
        percentage: 75,
        type: "Lecture",
      },
      {
        name: "Computer Networks",
        present: 21,
        absent: 4,
        late: 4,
        total: 29,
        percentage: 72,
        type: "Lecture + Lab",
      },
    ],
    calendar: [
      { date: "2024-01-15", status: "present", subject: "Data Structures" },
      { date: "2024-01-16", status: "absent", subject: "Software Engineering" },
      { date: "2024-01-17", status: "late", subject: "Database Systems" },
      { date: "2024-01-18", status: "present", subject: "Computer Networks" },
      // More calendar data...
    ],
  },
  2: {
    name: "Varun Sharma",
    overall: {
      present: 86,
      absent: 8,
      late: 6,
      total: 100,
      percentage: 86,
    },
    subjects: [
      {
        name: "Thermodynamics",
        present: 22,
        absent: 2,
        late: 1,
        total: 25,
        percentage: 88,
        type: "Lecture + Lab",
      },
      {
        name: "Fluid Mechanics",
        present: 18,
        absent: 2,
        late: 2,
        total: 22,
        percentage: 82,
        type: "Lecture + Lab",
      },
      {
        name: "Machine Design",
        present: 16,
        absent: 2,
        late: 2,
        total: 20,
        percentage: 80,
        type: "Lecture",
      },
      {
        name: "Materials Science",
        present: 19,
        absent: 1,
        late: 1,
        total: 21,
        percentage: 90,
        type: "Lecture",
      },
    ],
    calendar: [
      { date: "2024-01-15", status: "present", subject: "Thermodynamics" },
      { date: "2024-01-16", status: "present", subject: "Fluid Mechanics" },
      { date: "2024-01-17", status: "present", subject: "Machine Design" },
      { date: "2024-01-18", status: "late", subject: "Materials Science" },
      // More calendar data...
    ],
  },
}

export function AttendanceView() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [comparisonMode, setComparisonMode] = useState<boolean>(false)

  const currentData = attendanceData[selectedChild as keyof typeof attendanceData]
  const otherChildData = attendanceData[selectedChild === 1 ? 2 : 1]

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceBadgeColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (percentage >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Attendance</h1>
          <p className="text-muted-foreground text-pretty">
            Calendar view and summary for each child's attendance across subjects.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={selectedChild === 1 ? "default" : "outline"} onClick={() => setSelectedChild(1)}>
            Prakash
          </Button>
          <Button variant={selectedChild === 2 ? "default" : "outline"} onClick={() => setSelectedChild(2)}>
            Varun
          </Button>
          <Button variant={comparisonMode ? "default" : "outline"} onClick={() => setComparisonMode(!comparisonMode)}>
            <Users className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </div>
      </div>

      {comparisonMode ? (
        /* Comparison View */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Comparison</CardTitle>
              <CardDescription>Compare attendance trends across both children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {[attendanceData[1], attendanceData[2]].map((data, index) => (
                  <div key={index} className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{data.name}</h3>
                      <div className={`text-3xl font-bold ${getAttendanceColor(data.overall.percentage)}`}>
                        {data.overall.percentage}%
                      </div>
                      <p className="text-sm text-muted-foreground">Overall Attendance</p>
                    </div>
                    <div className="space-y-2">
                      {data.subjects.map((subject, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={subject.percentage} className="w-16 h-2" />
                            <Badge className={getAttendanceBadgeColor(subject.percentage)}>{subject.percentage}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Individual Attendance View */
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overall Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getAttendanceColor(currentData.overall.percentage)}`}>
                    {currentData.overall.percentage}%
                  </div>
                  <Progress value={currentData.overall.percentage} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Present Days</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{currentData.overall.present}</div>
                  <p className="text-xs text-muted-foreground">Out of {currentData.overall.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{currentData.overall.absent}</div>
                  <p className="text-xs text-muted-foreground">
                    {((currentData.overall.absent / currentData.overall.total) * 100).toFixed(1)}% of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{currentData.overall.late}</div>
                  <p className="text-xs text-muted-foreground">
                    {((currentData.overall.late / currentData.overall.total) * 100).toFixed(1)}% of total
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Attendance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.subjects
                    .filter((subject) => subject.percentage < 75)
                    .map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-red-900 dark:text-red-100">{subject.name}</p>
                          <p className="text-sm text-red-700 dark:text-red-300">Attendance below 75% threshold</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          {subject.percentage}%
                        </Badge>
                      </div>
                    ))}
                  {currentData.subjects.every((subject) => subject.percentage >= 75) && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">All subjects on track</p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Attendance is above 75% for all subjects
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Calendar</CardTitle>
                  <CardDescription>Click on a date to view attendance details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Daily Summary</CardTitle>
                  <CardDescription>{selectedDate ? selectedDate.toDateString() : "Select a date"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Late</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {currentData.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>{subject.type}</CardDescription>
                      </div>
                      <Badge className={getAttendanceBadgeColor(subject.percentage)}>{subject.percentage}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Attendance Rate</span>
                        <span className="font-medium">{subject.percentage}%</span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{subject.present}</div>
                        <div className="text-muted-foreground">Present</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{subject.absent}</div>
                        <div className="text-muted-foreground">Absent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{subject.late}</div>
                        <div className="text-muted-foreground">Late</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Classes:</span>
                        <span className="font-medium">{subject.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
