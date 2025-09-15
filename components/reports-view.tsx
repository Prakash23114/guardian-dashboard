"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Share,
  Calendar,
  GraduationCap,
  TrendingUp,
  Users,
  BookOpen,
  CreditCard,
  Clock,
} from "lucide-react"

// Mock reports data
const reportsData = {
  1: {
    name: "Prakash Kumar",
    rollNo: "CS21B1001",
    availableReports: [
      {
        id: 1,
        title: "Semester 6 Progress Report",
        type: "Academic",
        period: "Jan 2024 - May 2024",
        generatedDate: "2024-01-20",
        size: "2.3 MB",
        format: "PDF",
        description: "Comprehensive academic performance report including grades, attendance, and faculty feedback.",
      },
      {
        id: 2,
        title: "Attendance Summary Report",
        type: "Attendance",
        period: "Jan 2024 - Current",
        generatedDate: "2024-01-25",
        size: "1.1 MB",
        format: "PDF",
        description: "Detailed attendance analysis across all subjects with trends and alerts.",
      },
      {
        id: 3,
        title: "Fee Payment Statement",
        type: "Financial",
        period: "Academic Year 2023-24",
        generatedDate: "2024-01-15",
        size: "0.8 MB",
        format: "PDF",
        description: "Complete fee payment history with receipts and pending amounts.",
      },
      {
        id: 4,
        title: "Performance Analytics",
        type: "Analytics",
        period: "Semester 1-6",
        generatedDate: "2024-01-22",
        size: "3.2 MB",
        format: "Excel",
        description: "Data-driven insights on academic performance with comparative analysis.",
      },
    ],
  },
  2: {
    name: "Varun Sharma",
    rollNo: "ME21B2045",
    availableReports: [
      {
        id: 1,
        title: "Semester 4 Progress Report",
        type: "Academic",
        period: "Jan 2024 - May 2024",
        generatedDate: "2024-01-20",
        size: "2.1 MB",
        format: "PDF",
        description: "Comprehensive academic performance report including grades, attendance, and faculty feedback.",
      },
      {
        id: 2,
        title: "Attendance Summary Report",
        type: "Attendance",
        period: "Jan 2024 - Current",
        generatedDate: "2024-01-25",
        size: "1.0 MB",
        format: "PDF",
        description: "Detailed attendance analysis across all subjects with trends and alerts.",
      },
      {
        id: 3,
        title: "Fee Payment Statement",
        type: "Financial",
        period: "Academic Year 2023-24",
        generatedDate: "2024-01-15",
        size: "0.7 MB",
        format: "PDF",
        description: "Complete fee payment history with receipts and pending amounts.",
      },
    ],
  },
}

const reportTypes = [
  { value: "all", label: "All Reports", icon: FileText },
  { value: "academic", label: "Academic", icon: GraduationCap },
  { value: "attendance", label: "Attendance", icon: Calendar },
  { value: "financial", label: "Financial", icon: CreditCard },
  { value: "analytics", label: "Analytics", icon: TrendingUp },
]

export function ReportsView() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [combinedView, setCombinedView] = useState<boolean>(false)

  const currentData = reportsData[selectedChild as keyof typeof reportsData]
  const otherChildData = reportsData[selectedChild === 1 ? 2 : 1]

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "attendance":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "financial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "analytics":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "academic":
        return <GraduationCap className="h-4 w-4" />
      case "attendance":
        return <Calendar className="h-4 w-4" />
      case "financial":
        return <CreditCard className="h-4 w-4" />
      case "analytics":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredReports =
    selectedType === "all"
      ? currentData.availableReports
      : currentData.availableReports.filter((report) => report.type.toLowerCase() === selectedType)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reports</h1>
          <p className="text-muted-foreground text-pretty">
            Download academic reports, share with mentors, and generate combined family reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedChild === 1 ? "default" : "outline"}
            onClick={() => {
              setSelectedChild(1)
              setCombinedView(false)
            }}
          >
            Prakash
          </Button>
          <Button
            variant={selectedChild === 2 ? "default" : "outline"}
            onClick={() => {
              setSelectedChild(2)
              setCombinedView(false)
            }}
          >
            Varun
          </Button>
          <Button variant={combinedView ? "default" : "outline"} onClick={() => setCombinedView(!combinedView)}>
            <Users className="h-4 w-4 mr-2" />
            Combined Report
          </Button>
        </div>
      </div>

      {combinedView ? (
        /* Combined Family Report */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Combined Family Report
              </CardTitle>
              <CardDescription>Generate comprehensive reports for all children in one document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Available Combined Reports</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Academic Performance Report</span>
                      </div>
                      <Button size="sm">Generate</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Attendance Comparison Report</span>
                      </div>
                      <Button size="sm">Generate</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Financial Summary Report</span>
                      </div>
                      <Button size="sm">Generate</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Comprehensive Analytics Report</span>
                      </div>
                      <Button size="sm">Generate</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Report Features</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Side-by-side performance comparison</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Combined financial overview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Family academic trends</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Shareable with mentors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>PDF and Excel formats</span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Complete Family Report
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Share with Mentor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Individual Child Reports */
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Reports</TabsTrigger>
            <TabsTrigger value="generate">Generate New</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {/* Filter and Summary */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  {filteredReports.length} report{filteredReports.length !== 1 ? "s" : ""} available
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share Selected
                </Button>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>{report.period}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{report.generatedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {report.format} • {report.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create custom reports based on your requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Report Types</h3>
                    <div className="space-y-2">
                      {reportTypes.slice(1).map((type) => {
                        const Icon = type.icon
                        return (
                          <div key={type.value} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span className="text-sm font-medium">{type.label} Report</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Generate
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Custom Options</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Date Range</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current Semester</SelectItem>
                            <SelectItem value="last">Last Semester</SelectItem>
                            <SelectItem value="year">Academic Year</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Format</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                            <SelectItem value="both">Both Formats</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Include</label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="grades" className="rounded" defaultChecked />
                            <label htmlFor="grades" className="text-sm">
                              Grades & CGPA
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="attendance" className="rounded" defaultChecked />
                            <label htmlFor="attendance" className="text-sm">
                              Attendance Details
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="feedback" className="rounded" />
                            <label htmlFor="feedback" className="text-sm">
                              Faculty Feedback
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="comparison" className="rounded" />
                            <label htmlFor="comparison" className="text-sm">
                              Class Comparison
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
