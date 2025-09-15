"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  TrendingDown,
  Calendar,
  BookOpen,
  CreditCard,
  Users,
  Target,
  Brain,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

// Mock alerts and risk data
const alertsData = {
  1: {
    name: "Prakash Kumar",
    riskLevel: "medium",
    riskScore: 65,
    alerts: [
      {
        id: 1,
        type: "attendance",
        severity: "high",
        title: "Low Attendance Alert",
        message: "Attendance in Software Engineering is 75%, below the required 80%",
        subject: "Software Engineering",
        value: "75%",
        threshold: "80%",
        createdAt: "2024-01-20",
        status: "active",
        actionRequired: true,
      },
      {
        id: 2,
        type: "performance",
        severity: "medium",
        title: "Grade Decline",
        message: "CGPA dropped from 8.6 to 8.5 in the current semester",
        subject: "Overall",
        value: "8.5",
        threshold: "8.6",
        createdAt: "2024-01-18",
        status: "active",
        actionRequired: false,
      },
      {
        id: 3,
        type: "assignment",
        severity: "medium",
        title: "Pending Assignment",
        message: "Software Engineering project submission is overdue by 2 days",
        subject: "Software Engineering",
        value: "2 days overdue",
        threshold: "On time",
        createdAt: "2024-01-22",
        status: "active",
        actionRequired: true,
      },
      {
        id: 4,
        type: "fees",
        severity: "low",
        title: "Fee Payment Reminder",
        message: "Library fee payment due in 5 days",
        subject: "Financial",
        value: "₹5,000",
        threshold: "Due: 2024-02-15",
        createdAt: "2024-01-15",
        status: "resolved",
        actionRequired: false,
      },
    ],
    riskFactors: [
      {
        factor: "Attendance Rate",
        current: 78,
        target: 85,
        impact: "high",
        trend: "declining",
        description: "Below target attendance affecting academic standing",
      },
      {
        factor: "Assignment Completion",
        current: 87,
        target: 95,
        impact: "medium",
        trend: "stable",
        description: "Some assignments submitted late or incomplete",
      },
      {
        factor: "Subject Performance",
        current: 82,
        target: 85,
        impact: "medium",
        trend: "improving",
        description: "Performance in core subjects needs attention",
      },
      {
        factor: "Engagement Level",
        current: 75,
        target: 80,
        impact: "low",
        trend: "stable",
        description: "Participation in class activities could be better",
      },
    ],
    aiInsights: [
      {
        type: "prediction",
        message: "Based on current trends, there's a 30% risk of CGPA dropping below 8.0 if attendance doesn't improve",
        confidence: 85,
        recommendation: "Focus on improving attendance in Software Engineering and seek additional support",
      },
      {
        type: "pattern",
        message: "Performance typically drops during mid-semester periods. Extra attention needed in weeks 6-8",
        confidence: 92,
        recommendation: "Schedule regular check-ins with mentors during critical periods",
      },
    ],
  },
  2: {
    name: "Varun Sharma",
    riskLevel: "low",
    riskScore: 25,
    alerts: [
      {
        id: 1,
        type: "performance",
        severity: "low",
        title: "Subject Improvement Needed",
        message: "Machine Design grade could be improved with additional practice",
        subject: "Machine Design",
        value: "B+",
        threshold: "A",
        createdAt: "2024-01-19",
        status: "active",
        actionRequired: false,
      },
      {
        id: 2,
        type: "fees",
        severity: "low",
        title: "Upcoming Fee Payment",
        message: "Sports fee payment due in 10 days",
        subject: "Financial",
        value: "₹4,000",
        threshold: "Due: 2024-02-15",
        createdAt: "2024-01-16",
        status: "active",
        actionRequired: false,
      },
    ],
    riskFactors: [
      {
        factor: "Attendance Rate",
        current: 86,
        target: 85,
        impact: "low",
        trend: "stable",
        description: "Maintaining good attendance across all subjects",
      },
      {
        factor: "Assignment Completion",
        current: 95,
        target: 95,
        impact: "low",
        trend: "stable",
        description: "Consistently completing assignments on time",
      },
      {
        factor: "Subject Performance",
        current: 88,
        target: 85,
        impact: "low",
        trend: "improving",
        description: "Strong performance across most subjects",
      },
      {
        factor: "Engagement Level",
        current: 85,
        target: 80,
        impact: "low",
        trend: "improving",
        description: "Active participation in class and lab sessions",
      },
    ],
    aiInsights: [
      {
        type: "positive",
        message: "Current trajectory suggests potential for Dean's List recognition this semester",
        confidence: 78,
        recommendation: "Continue current study patterns and consider taking on additional challenges",
      },
      {
        type: "opportunity",
        message: "Strong performance in Mathematics suggests aptitude for advanced engineering courses",
        confidence: 88,
        recommendation: "Consider enrolling in advanced mathematics or research projects",
      },
    ],
  },
}

export function AlertsAndRiskFactors() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [alertFilter, setAlertFilter] = useState<string>("all")
  const [combinedView, setCombinedView] = useState<boolean>(false)

  const currentData = alertsData[selectedChild as keyof typeof alertsData]
  const otherChildData = alertsData[selectedChild === 1 ? 2 : 1]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingDown className="h-4 w-4 text-green-600 rotate-180" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable":
        return <Target className="h-4 w-4 text-blue-600" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const activeAlerts = currentData.alerts.filter((alert) => alert.status === "active")
  const filteredAlerts =
    alertFilter === "all" ? activeAlerts : activeAlerts.filter((alert) => alert.severity === alertFilter)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Alerts & Risk Factors</h1>
          <p className="text-muted-foreground text-pretty">
            Monitor dropout risk factors and receive AI-driven alerts for academic concerns.
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
            Compare Risk
          </Button>
        </div>
      </div>

      {combinedView ? (
        /* Combined Risk Comparison */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Assessment Comparison
              </CardTitle>
              <CardDescription>Compare risk levels and factors across both children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {[alertsData[1], alertsData[2]].map((data, index) => (
                  <div key={index} className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{data.name}</h3>
                      <div className={`text-3xl font-bold ${getRiskColor(data.riskLevel)}`}>
                        {data.riskLevel.toUpperCase()}
                      </div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <div className="mt-2">
                        <Progress value={data.riskScore} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Risk Score: {data.riskScore}/100</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Active Alerts</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {data.alerts.filter((a) => a.status === "active").length}
                        </div>
                        <p className="text-xs text-muted-foreground">Active alerts</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most At-Risk Child */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Risk Assessment Summary</AlertTitle>
            <AlertDescription>
              {alertsData[1].riskScore > alertsData[2].riskScore
                ? `${alertsData[1].name} requires more attention with a ${alertsData[1].riskLevel} risk level.`
                : alertsData[2].riskScore > alertsData[1].riskScore
                  ? `${alertsData[2].name} requires more attention with a ${alertsData[2].riskLevel} risk level.`
                  : "Both children have similar risk levels. Continue monitoring both equally."}
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        /* Individual Child Risk Analysis */
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Risk Level Summary */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getRiskColor(currentData.riskLevel)}`}>
                    {currentData.riskLevel.toUpperCase()}
                  </div>
                  <Progress value={currentData.riskScore} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{activeAlerts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {activeAlerts.filter((a) => a.actionRequired).length} require action
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {activeAlerts.filter((a) => a.severity === "high").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Critical issues</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {currentData.alerts.filter((a) => a.status === "resolved").length}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-2 rounded-full bg-muted">
                        {alert.type === "attendance" && <Calendar className="h-4 w-4 text-orange-600" />}
                        {alert.type === "performance" && <TrendingDown className="h-4 w-4 text-red-600" />}
                        {alert.type === "assignment" && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {alert.type === "fees" && <CreditCard className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{alert.createdAt}</p>
                      </div>
                      {alert.actionRequired && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {/* Alert Filters */}
            <div className="flex gap-2">
              <Button
                variant={alertFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlertFilter("all")}
              >
                All ({activeAlerts.length})
              </Button>
              <Button
                variant={alertFilter === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlertFilter("high")}
              >
                High ({activeAlerts.filter((a) => a.severity === "high").length})
              </Button>
              <Button
                variant={alertFilter === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlertFilter("medium")}
              >
                Medium ({activeAlerts.filter((a) => a.severity === "medium").length})
              </Button>
              <Button
                variant={alertFilter === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlertFilter("low")}
              >
                Low ({activeAlerts.filter((a) => a.severity === "low").length})
              </Button>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {alert.type === "attendance" && <Calendar className="h-5 w-5 text-orange-600" />}
                        {alert.type === "performance" && <TrendingDown className="h-5 w-5 text-red-600" />}
                        {alert.type === "assignment" && <BookOpen className="h-5 w-5 text-blue-600" />}
                        {alert.type === "fees" && <CreditCard className="h-5 w-5 text-purple-600" />}
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription>{alert.subject}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{alert.message}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Value:</span>
                        <span className="ml-2 font-medium">{alert.value}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target/Threshold:</span>
                        <span className="ml-2 font-medium">{alert.threshold}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{alert.createdAt}</span>
                      </div>
                      <div className="flex gap-2">
                        {alert.actionRequired && <Button size="sm">Take Action</Button>}
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="factors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {currentData.riskFactors.map((factor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{factor.factor}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(factor.trend)}
                        <Badge className={`${getImpactColor(factor.impact)} bg-transparent border`}>
                          {factor.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current Performance</span>
                        <span className="font-medium">{factor.current}%</span>
                      </div>
                      <Progress value={factor.current} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Target: {factor.target}%</span>
                        <span className={factor.current >= factor.target ? "text-green-600" : "text-red-600"}>
                          {factor.current >= factor.target ? "On Track" : "Below Target"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>Machine learning analysis of academic patterns and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {insight.type}
                        </Badge>
                        <div className="text-sm text-muted-foreground">Confidence: {insight.confidence}%</div>
                      </div>
                      <p className="text-sm">{insight.message}</p>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Recommendation:</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{insight.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
