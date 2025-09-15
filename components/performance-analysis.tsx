"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Award, AlertTriangle, Target, Calendar, Users } from "lucide-react"

// Mock performance data
const performanceData = {
  1: {
    name: "Prakash Kumar",
    currentCGPA: 8.5,
    semesterData: [
      { semester: "Sem 1", cgpa: 7.8, classAverage: 7.5 },
      { semester: "Sem 2", cgpa: 8.1, classAverage: 7.6 },
      { semester: "Sem 3", cgpa: 8.3, classAverage: 7.7 },
      { semester: "Sem 4", cgpa: 8.4, classAverage: 7.8 },
      { semester: "Sem 5", cgpa: 8.6, classAverage: 7.9 },
      { semester: "Sem 6", cgpa: 8.5, classAverage: 8.0 },
    ],
    subjectPerformance: [
      { subject: "Data Structures", grade: 9.0, classAverage: 7.8, credits: 4 },
      { subject: "Database Systems", grade: 9.2, classAverage: 8.1, credits: 3 },
      { subject: "Software Engineering", grade: 7.8, classAverage: 7.5, credits: 3 },
      { subject: "Computer Networks", grade: 8.5, classAverage: 7.9, credits: 4 },
      { subject: "Operating Systems", grade: 8.2, classAverage: 7.7, credits: 4 },
    ],
    gradeDistribution: [
      { grade: "A+", count: 8, color: "#22c55e" },
      { grade: "A", count: 12, color: "#3b82f6" },
      { grade: "B+", count: 6, color: "#f59e0b" },
      { grade: "B", count: 2, color: "#ef4444" },
    ],
    insights: [
      {
        type: "strength",
        message: "Consistently performing above class average",
        icon: TrendingUp,
        color: "text-green-600",
      },
      {
        type: "improvement",
        message: "Software Engineering needs attention",
        icon: AlertTriangle,
        color: "text-orange-600",
      },
      {
        type: "trend",
        message: "CGPA trend is stable with slight improvement",
        icon: Target,
        color: "text-blue-600",
      },
    ],
  },
  2: {
    name: "Varun Sharma",
    currentCGPA: 7.9,
    semesterData: [
      { semester: "Sem 1", cgpa: 7.2, classAverage: 7.1 },
      { semester: "Sem 2", cgpa: 7.5, classAverage: 7.3 },
      { semester: "Sem 3", cgpa: 7.8, classAverage: 7.4 },
      { semester: "Sem 4", cgpa: 7.9, classAverage: 7.5 },
    ],
    subjectPerformance: [
      { subject: "Thermodynamics", grade: 8.5, classAverage: 7.8, credits: 4 },
      { subject: "Fluid Mechanics", grade: 7.8, classAverage: 7.5, credits: 3 },
      { subject: "Machine Design", grade: 7.5, classAverage: 7.2, credits: 3 },
      { subject: "Materials Science", grade: 8.2, classAverage: 7.6, credits: 3 },
      { subject: "Engineering Math", grade: 8.8, classAverage: 7.9, credits: 4 },
    ],
    gradeDistribution: [
      { grade: "A+", count: 4, color: "#22c55e" },
      { grade: "A", count: 8, color: "#3b82f6" },
      { grade: "B+", count: 10, color: "#f59e0b" },
      { grade: "B", count: 3, color: "#ef4444" },
    ],
    insights: [
      {
        type: "strength",
        message: "Strong performance in Mathematics",
        icon: Award,
        color: "text-green-600",
      },
      {
        type: "improvement",
        message: "Machine Design requires more focus",
        icon: AlertTriangle,
        color: "text-orange-600",
      },
      {
        type: "trend",
        message: "Steady improvement across semesters",
        icon: TrendingUp,
        color: "text-blue-600",
      },
    ],
  },
}

export function PerformanceAnalysis() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [comparisonMode, setComparisonMode] = useState<boolean>(false)

  const currentData = performanceData[selectedChild as keyof typeof performanceData]
  const otherChildData = performanceData[selectedChild === 1 ? 2 : 1]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Performance & Analysis</h1>
          <p className="text-muted-foreground text-pretty">
            Interactive CGPA charts, subject comparisons, and AI-based insights for academic performance.
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
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of both children's academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {[performanceData[1], performanceData[2]].map((data, index) => (
                  <div key={index} className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{data.name}</h3>
                      <div className="text-3xl font-bold text-primary">{data.currentCGPA}</div>
                      <p className="text-sm text-muted-foreground">Current CGPA</p>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.semesterData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="semester" />
                          <YAxis domain={[6, 10]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="cgpa"
                            stroke="#2196F3"
                            strokeWidth={2}
                            dot={{ fill: "#2196F3" }}
                          />
                          <Line type="monotone" dataKey="classAverage" stroke="#94a3b8" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Individual Performance View */
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">CGPA Trends</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{currentData.currentCGPA}</div>
                  <p className="text-xs text-muted-foreground">Out of 10.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-xs text-muted-foreground">Out of 60 students</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subjects Above Avg</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {currentData.subjectPerformance.filter((s) => s.grade > s.classAverage).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Out of {currentData.subjectPerformance.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade Trend</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">+0.1</span>
                  </div>
                  <p className="text-xs text-muted-foreground">From last semester</p>
                </CardContent>
              </Card>
            </div>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Distribution of grades across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="h-64 w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentData.gradeDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="count"
                        >
                          {currentData.gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {currentData.gradeDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">
                        {entry.grade}: {entry.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>CGPA Trend Analysis</CardTitle>
                <CardDescription>Semester-wise CGPA progression vs class average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData.semesterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[6, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="cgpa"
                        stroke="#2196F3"
                        strokeWidth={3}
                        dot={{ fill: "#2196F3", strokeWidth: 2, r: 6 }}
                        name="Your CGPA"
                      />
                      <Line
                        type="monotone"
                        dataKey="classAverage"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#94a3b8", strokeWidth: 2, r: 4 }}
                        name="Class Average"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Individual subject grades compared to class average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData.subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="grade" fill="#2196F3" name="Your Grade" />
                      <Bar dataKey="classAverage" fill="#94a3b8" name="Class Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Details */}
            <div className="grid gap-4 md:grid-cols-2">
              {currentData.subjectPerformance.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.subject}</CardTitle>
                      <Badge variant={subject.grade > subject.classAverage ? "default" : "secondary"}>
                        {subject.grade > subject.classAverage ? "Above Avg" : "Below Avg"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your Grade</span>
                        <span className="font-medium">{subject.grade}/10</span>
                      </div>
                      <Progress value={subject.grade * 10} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Class Average</span>
                        <span className="font-medium">{subject.classAverage}/10</span>
                      </div>
                      <Progress value={subject.classAverage * 10} className="h-2 opacity-60" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credits:</span>
                      <span className="font-medium">{subject.credits}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Personalized recommendations based on performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className={`p-2 rounded-full bg-muted ${insight.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{insight.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">Based on performance data analysis</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Study Focus</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Allocate more time to Software Engineering concepts and practical applications.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">Strengths</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Continue excelling in Database Systems and Data Structures.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Attendance</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Improve attendance in Software Engineering to better understand concepts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
