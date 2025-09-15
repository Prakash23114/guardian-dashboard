"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Award, Target } from "lucide-react"

// Mock data for subjects and courses
const childrenSubjects = {
  1: {
    name: "Prakash Kumar",
    semester: "6th Semester",
    subjects: [
      {
        id: 1,
        name: "Data Structures and Algorithms",
        code: "CS301",
        professor: "Dr. Amit Sharma",
        credits: 4,
        progress: 85,
        grade: "A",
        attendance: 82,
        assignments: {
          total: 8,
          completed: 7,
          pending: 1,
        },
        notes: "Excellent performance in practical sessions. Need to improve theoretical concepts.",
        schedule: [
          { day: "Monday", time: "9:00 AM - 10:30 AM", type: "Lecture" },
          { day: "Wednesday", time: "2:00 PM - 4:00 PM", type: "Lab" },
          { day: "Friday", time: "11:00 AM - 12:30 PM", type: "Tutorial" },
        ],
      },
      {
        id: 2,
        name: "Database Management Systems",
        code: "CS302",
        professor: "Prof. Sarah Johnson",
        credits: 3,
        progress: 92,
        grade: "A+",
        attendance: 88,
        assignments: {
          total: 6,
          completed: 6,
          pending: 0,
        },
        notes: "Outstanding performance. Shows great understanding of database concepts.",
        schedule: [
          { day: "Tuesday", time: "10:00 AM - 11:30 AM", type: "Lecture" },
          { day: "Thursday", time: "3:00 PM - 5:00 PM", type: "Lab" },
        ],
      },
      {
        id: 3,
        name: "Software Engineering",
        code: "CS303",
        professor: "Dr. Michael Chen",
        credits: 3,
        progress: 76,
        grade: "B+",
        attendance: 75,
        assignments: {
          total: 5,
          completed: 4,
          pending: 1,
        },
        notes: "Good understanding but needs to improve attendance and participation.",
        schedule: [
          { day: "Monday", time: "2:00 PM - 3:30 PM", type: "Lecture" },
          { day: "Wednesday", time: "10:00 AM - 11:30 AM", type: "Tutorial" },
        ],
      },
      {
        id: 4,
        name: "Computer Networks",
        code: "CS304",
        professor: "Prof. Lisa Wang",
        credits: 4,
        progress: 88,
        grade: "A",
        attendance: 85,
        assignments: {
          total: 7,
          completed: 6,
          pending: 1,
        },
        notes: "Strong grasp of networking concepts. Excellent lab work.",
        schedule: [
          { day: "Tuesday", time: "2:00 PM - 3:30 PM", type: "Lecture" },
          { day: "Friday", time: "9:00 AM - 12:00 PM", type: "Lab" },
        ],
      },
    ],
  },
  2: {
    name: "Varun Sharma",
    semester: "4th Semester",
    subjects: [
      {
        id: 1,
        name: "Thermodynamics",
        code: "ME201",
        professor: "Dr. Rajesh Kumar",
        credits: 4,
        progress: 88,
        grade: "A",
        attendance: 90,
        assignments: {
          total: 6,
          completed: 5,
          pending: 1,
        },
        notes: "Excellent understanding of thermodynamic principles.",
        schedule: [
          { day: "Monday", time: "9:00 AM - 10:30 AM", type: "Lecture" },
          { day: "Thursday", time: "2:00 PM - 4:00 PM", type: "Lab" },
        ],
      },
      {
        id: 2,
        name: "Fluid Mechanics",
        code: "ME202",
        professor: "Prof. Anita Desai",
        credits: 3,
        progress: 82,
        grade: "B+",
        attendance: 85,
        assignments: {
          total: 5,
          completed: 4,
          pending: 1,
        },
        notes: "Good progress in fluid dynamics concepts.",
        schedule: [
          { day: "Tuesday", time: "11:00 AM - 12:30 PM", type: "Lecture" },
          { day: "Friday", time: "10:00 AM - 12:00 PM", type: "Lab" },
        ],
      },
      {
        id: 3,
        name: "Machine Design",
        code: "ME203",
        professor: "Dr. Suresh Patel",
        credits: 3,
        progress: 79,
        grade: "B+",
        attendance: 82,
        assignments: {
          total: 4,
          completed: 3,
          pending: 1,
        },
        notes: "Needs improvement in design calculations.",
        schedule: [
          { day: "Wednesday", time: "9:00 AM - 10:30 AM", type: "Lecture" },
          { day: "Friday", time: "2:00 PM - 4:00 PM", type: "Tutorial" },
        ],
      },
    ],
  },
}

export function SubjectsAndCourses() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)

  const currentChildData = childrenSubjects[selectedChild as keyof typeof childrenSubjects]
  const selectedSubjectData = selectedSubject
    ? currentChildData.subjects.find((subject) => subject.id === selectedSubject)
    : null

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "A":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "B+":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "B":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Subjects & Courses</h1>
          <p className="text-muted-foreground text-pretty">
            Track subject progress, assignments, and professor interactions for each child.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedChild === 1 ? "default" : "outline"}
            onClick={() => {
              setSelectedChild(1)
              setSelectedSubject(null)
            }}
          >
            Prakash
          </Button>
          <Button
            variant={selectedChild === 2 ? "default" : "outline"}
            onClick={() => {
              setSelectedChild(2)
              setSelectedSubject(null)
            }}
          >
            Varun
          </Button>
        </div>
      </div>

      {selectedSubject ? (
        /* Individual Subject View */
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedSubject(null)}>
              ← Back to Subjects
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedSubjectData?.name}</h2>
              <p className="text-muted-foreground">
                {selectedSubjectData?.code} • {currentChildData.name}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Subject Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Subject Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{selectedSubjectData?.progress}%</span>
                    </div>
                    <Progress value={selectedSubjectData?.progress} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Attendance</span>
                      <span className="text-sm">{selectedSubjectData?.attendance}%</span>
                    </div>
                    <Progress value={selectedSubjectData?.attendance} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Assignments</span>
                      <span className="text-sm">
                        {selectedSubjectData?.assignments.completed}/{selectedSubjectData?.assignments.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedSubjectData
                          ? (selectedSubjectData.assignments.completed / selectedSubjectData.assignments.total) * 100
                          : 0
                      }
                    />
                  </div>
                </div>

                {/* Professor Notes */}
                <div className="space-y-2">
                  <h4 className="font-medium">Professor's Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedSubjectData?.notes}</p>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <h4 className="font-medium">Class Schedule</h4>
                  <div className="space-y-2">
                    {selectedSubjectData?.schedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{session.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{session.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {session.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Professor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedSubjectData?.professor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedSubjectData?.professor}</h3>
                    <p className="text-sm text-muted-foreground">Subject Professor</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subject Code:</span>
                    <span className="font-medium">{selectedSubjectData?.code}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Credits:</span>
                    <span className="font-medium">{selectedSubjectData?.credits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Grade:</span>
                    <Badge className={getGradeColor(selectedSubjectData?.grade || "")}>
                      {selectedSubjectData?.grade}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full">Contact Professor</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Subjects Overview */
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{currentChildData.subjects.length}</div>
                <p className="text-xs text-muted-foreground">{currentChildData.semester}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    currentChildData.subjects.reduce((acc, subject) => acc + subject.progress, 0) /
                      currentChildData.subjects.length,
                  )}
                  %
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentChildData.subjects.reduce((acc, subject) => acc + subject.credits, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentChildData.subjects.reduce((acc, subject) => acc + subject.assignments.pending, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {currentChildData.subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.code} • {subject.professor}
                      </CardDescription>
                    </div>
                    <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Indicators */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Course Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Attendance</span>
                        <span className="font-medium">{subject.attendance}%</span>
                      </div>
                      <Progress value={subject.attendance} className="h-2" />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {subject.credits} credits
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {subject.assignments.completed}/{subject.assignments.total} assignments
                    </Badge>
                    {subject.assignments.pending > 0 && (
                      <Badge variant="outline" className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="h-3 w-3" />
                        {subject.assignments.pending} pending
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full" onClick={() => setSelectedSubject(subject.id)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
