"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Target,
  Award,
} from "lucide-react"

// Mock data for demonstration
const overallStats = {
  totalChildren: 2,
  averageAttendance: 82,
  averageCGPA: 8.2,
  pendingFees: 15000,
  upcomingEvents: 3,
}

const childrenData = [
  {
    id: 1,
    name: "Prakash Kumar",
    rollNo: "CS21B1001",
    course: "Computer Science Engineering",
    semester: "6th Semester",
    mentor: "Dr. Sarah Johnson",
    avatar: "/prakash-avatar.jpg",
    stats: {
      attendance: 78,
      cgpa: 8.5,
      pendingFees: 8000,
      riskLevel: "medium",
      recentGrade: "A",
      upcomingExams: 2,
    },
    subjects: [
      { name: "Data Structures", progress: 85, grade: "A" },
      { name: "Database Systems", progress: 92, grade: "A+" },
      { name: "Software Engineering", progress: 76, grade: "B+" },
    ],
  },
  {
    id: 2,
    name: "Varun Sharma",
    rollNo: "ME21B2045",
    course: "Mechanical Engineering",
    semester: "4th Semester",
    mentor: "Prof. Michael Chen",
    avatar: "/varun-avatar.jpg",
    stats: {
      attendance: 86,
      cgpa: 7.9,
      pendingFees: 7000,
      riskLevel: "low",
      recentGrade: "B+",
      upcomingExams: 1,
    },
    subjects: [
      { name: "Thermodynamics", progress: 88, grade: "A" },
      { name: "Fluid Mechanics", progress: 82, grade: "B+" },
      { name: "Machine Design", progress: 79, grade: "B+" },
    ],
  },
]

const recentActivities = [
  {
    id: 1,
    type: "grade",
    message: "Prakash received A+ in Database Systems",
    time: "2 hours ago",
    icon: Award,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "attendance",
    message: "Varun marked present for Thermodynamics lab",
    time: "4 hours ago",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "alert",
    message: "Low attendance alert for Prakash (78%)",
    time: "1 day ago",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    id: 4,
    type: "payment",
    message: "Fee payment reminder sent",
    time: "2 days ago",
    icon: CreditCard,
    color: "text-purple-600",
  },
]

export function DashboardOverview() {
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Dashboard Overview</h1>
        <p className="text-muted-foreground text-pretty">
          Monitor your children's academic progress, attendance, and overall performance at a glance.
        </p>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallStats.totalChildren}</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.averageAttendance >= 75 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Above target
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  Below target
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CGPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallStats.averageCGPA}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{overallStats.pendingFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallStats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-balance">Children Overview</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {childrenData.map((child) => (
            <Card key={child.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                      <AvatarFallback>
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{child.name}</CardTitle>
                      <CardDescription>{child.rollNo}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getRiskBadgeColor(child.stats.riskLevel)}>{child.stats.riskLevel} risk</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{child.course}</p>
                  <p>
                    {child.semester} • Mentor: {child.mentor}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Attendance</span>
                      <span className="font-medium">{child.stats.attendance}%</span>
                    </div>
                    <Progress value={child.stats.attendance} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>CGPA</span>
                      <span className="font-medium">{child.stats.cgpa}/10</span>
                    </div>
                    <Progress value={child.stats.cgpa * 10} className="h-2" />
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Recent: {child.stats.recentGrade}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {child.stats.upcomingExams} exams
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />₹{child.stats.pendingFees.toLocaleString()} due
                  </Badge>
                </div>

                {/* Top Subjects */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Top Subjects</h4>
                  <div className="space-y-1">
                    {child.subjects.slice(0, 2).map((subject, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{subject.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={subject.progress} className="w-16 h-1" />
                          <Badge variant="secondary" className="text-xs">
                            {subject.grade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recent Activities
          </CardTitle>
          <CardDescription>Latest updates from your children's academic journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full bg-transparent">
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
