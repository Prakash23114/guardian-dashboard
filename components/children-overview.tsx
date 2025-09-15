"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  BookOpen,
  CheckCircle,
  Award,
  Phone,
  Mail,
  Target,
} from "lucide-react"

// Extended mock data for children
const childrenData = [
  {
    id: 1,
    name: "Prakash Kumar",
    rollNo: "CS21B1001",
    course: "Computer Science Engineering",
    semester: "6th Semester",
    year: "3rd Year",
    mentor: "Dr. Sarah Johnson",
    mentorEmail: "sarah.johnson@university.edu",
    mentorPhone: "+91 9876543210",
    avatar: "/prakash-avatar.jpg",
    dateOfBirth: "2003-05-15",
    bloodGroup: "B+",
    address: "Hostel Block A, Room 205",
    emergencyContact: "+91 9876543211",
    stats: {
      attendance: 78,
      cgpa: 8.5,
      pendingFees: 8000,
      riskLevel: "medium",
      recentGrade: "A",
      upcomingExams: 2,
      totalCredits: 180,
      completedCredits: 135,
    },
    subjects: [
      { name: "Data Structures", progress: 85, grade: "A", credits: 4 },
      { name: "Database Systems", progress: 92, grade: "A+", credits: 3 },
      { name: "Software Engineering", progress: 76, grade: "B+", credits: 3 },
      { name: "Computer Networks", progress: 88, grade: "A", credits: 4 },
      { name: "Operating Systems", progress: 82, grade: "B+", credits: 4 },
    ],
    recentActivities: [
      { type: "grade", message: "Received A+ in Database Systems", time: "2 hours ago" },
      { type: "attendance", message: "Marked present for Data Structures lab", time: "1 day ago" },
      { type: "assignment", message: "Submitted Software Engineering project", time: "2 days ago" },
    ],
  },
  {
    id: 2,
    name: "Varun Sharma",
    rollNo: "ME21B2045",
    course: "Mechanical Engineering",
    semester: "4th Semester",
    year: "2nd Year",
    mentor: "Prof. Michael Chen",
    mentorEmail: "michael.chen@university.edu",
    mentorPhone: "+91 9876543220",
    avatar: "/varun-avatar.jpg",
    dateOfBirth: "2004-08-22",
    bloodGroup: "A+",
    address: "Hostel Block B, Room 312",
    emergencyContact: "+91 9876543221",
    stats: {
      attendance: 86,
      cgpa: 7.9,
      pendingFees: 7000,
      riskLevel: "low",
      recentGrade: "B+",
      upcomingExams: 1,
      totalCredits: 120,
      completedCredits: 60,
    },
    subjects: [
      { name: "Thermodynamics", progress: 88, grade: "A", credits: 4 },
      { name: "Fluid Mechanics", progress: 82, grade: "B+", credits: 3 },
      { name: "Machine Design", progress: 79, grade: "B+", credits: 3 },
      { name: "Materials Science", progress: 85, grade: "A", credits: 3 },
      { name: "Engineering Mathematics", progress: 90, grade: "A+", credits: 4 },
    ],
    recentActivities: [
      { type: "attendance", message: "Marked present for Thermodynamics lab", time: "4 hours ago" },
      { type: "grade", message: "Received A+ in Engineering Mathematics", time: "1 day ago" },
      { type: "assignment", message: "Submitted Machine Design assignment", time: "3 days ago" },
    ],
  },
]

export function ChildrenOverview() {
  const [selectedChild, setSelectedChild] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"all" | "individual">("all")

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

  const handleViewChild = (childId: number) => {
    setSelectedChild(childId)
    setViewMode("individual")
  }

  const selectedChildData = selectedChild ? childrenData.find((child) => child.id === selectedChild) : null

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Children Overview</h1>
          <p className="text-muted-foreground text-pretty">
            Manage and monitor your children's academic progress and personal information.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "all" ? "default" : "outline"}
            onClick={() => {
              setViewMode("all")
              setSelectedChild(null)
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            View All
          </Button>
          {selectedChild && (
            <Button variant="outline" onClick={() => setViewMode("all")}>
              Back to Overview
            </Button>
          )}
        </div>
      </div>

      {viewMode === "all" ? (
        /* All Children View */
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Children</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{childrenData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    childrenData.reduce((acc, child) => acc + child.stats.attendance, 0) / childrenData.length,
                  )}
                  %
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. CGPA</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {(childrenData.reduce((acc, child) => acc + child.stats.cgpa, 0) / childrenData.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ₹{childrenData.reduce((acc, child) => acc + child.stats.pendingFees, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Children Cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {childrenData.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                        <AvatarFallback className="text-lg">
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{child.name}</CardTitle>
                        <CardDescription className="text-base">{child.rollNo}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-1">{child.course}</p>
                      </div>
                    </div>
                    <Badge className={getRiskBadgeColor(child.stats.riskLevel)}>{child.stats.riskLevel} risk</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Academic Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Semester:</span>
                      <span className="ml-2 font-medium">{child.semester}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mentor:</span>
                      <span className="ml-2 font-medium">{child.mentor}</span>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Attendance</span>
                        <span className="font-medium">{child.stats.attendance}%</span>
                      </div>
                      <Progress value={child.stats.attendance} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>CGPA</span>
                        <span className="font-medium">{child.stats.cgpa}/10</span>
                      </div>
                      <Progress value={child.stats.cgpa * 10} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Credits Progress</span>
                        <span className="font-medium">
                          {child.stats.completedCredits}/{child.stats.totalCredits}
                        </span>
                      </div>
                      <Progress
                        value={(child.stats.completedCredits / child.stats.totalCredits) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-2">
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

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => handleViewChild(child.id)}>
                      View Details
                    </Button>
                    <Button variant="outline">Contact Mentor</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Individual Child View */
        selectedChildData && (
          <div className="space-y-6">
            {/* Child Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedChildData.avatar || "/placeholder.svg"} alt={selectedChildData.name} />
                    <AvatarFallback className="text-xl">
                      {selectedChildData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedChildData.name}</CardTitle>
                        <CardDescription className="text-lg">{selectedChildData.rollNo}</CardDescription>
                        <p className="text-muted-foreground mt-1">{selectedChildData.course}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedChildData.semester} • {selectedChildData.year}
                        </p>
                      </div>
                      <Badge className={getRiskBadgeColor(selectedChildData.stats.riskLevel)}>
                        {selectedChildData.stats.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">{selectedChildData.stats.attendance}%</div>
                      <Progress value={selectedChildData.stats.attendance} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">CGPA</CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">{selectedChildData.stats.cgpa}/10</div>
                      <Progress value={selectedChildData.stats.cgpa * 10} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        ₹{selectedChildData.stats.pendingFees.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Due this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Credits</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {selectedChildData.stats.completedCredits}/{selectedChildData.stats.totalCredits}
                      </div>
                      <Progress
                        value={(selectedChildData.stats.completedCredits / selectedChildData.stats.totalCredits) * 100}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedChildData.recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <div className="p-2 rounded-full bg-primary/10">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Subjects</CardTitle>
                    <CardDescription>Progress and grades for {selectedChildData.semester}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedChildData.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{subject.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{subject.grade}</Badge>
                                <span className="text-sm text-muted-foreground">{subject.credits} credits</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={subject.progress} className="flex-1" />
                              <span className="text-sm font-medium">{subject.progress}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                        <p className="text-sm">{selectedChildData.dateOfBirth}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                        <p className="text-sm">{selectedChildData.bloodGroup}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                        <p className="text-sm">{selectedChildData.address}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                        <p className="text-sm">{selectedChildData.emergencyContact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mentor Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedChildData.mentor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedChildData.mentor}</h3>
                        <p className="text-sm text-muted-foreground">Academic Mentor</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedChildData.mentorEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedChildData.mentorPhone}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Mentor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )
      )}
    </div>
  )
}
