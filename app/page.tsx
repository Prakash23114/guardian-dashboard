"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { MyProfile } from "@/components/my-profile"
import { ChildrenOverview } from "@/components/children-overview"
import { SubjectsAndCourses } from "@/components/subjects-and-courses"
import { PerformanceAnalysis } from "@/components/performance-analysis"
import { AttendanceView } from "@/components/attendance-view"
import { FeesAndPayments } from "@/components/fees-and-payments"
import { ReportsView } from "@/components/reports-view"
import { AlertsAndRiskFactors } from "@/components/alerts-and-risk-factors"
import { Communication } from "@/components/communication"
import { Community } from "@/components/community"
import { Events } from "@/components/events"
import { HelpAndSupport } from "@/components/help-and-support"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "profile":
        return <MyProfile />
      case "children":
        return <ChildrenOverview />
      case "subjects":
        return <SubjectsAndCourses />
      case "performance":
        return <PerformanceAnalysis />
      case "attendance":
        return <AttendanceView />
      case "fees":
        return <FeesAndPayments />
      case "reports":
        return <ReportsView />
      case "alerts":
        return <AlertsAndRiskFactors />
      case "communication":
        return <Communication />
      case "community":
        return <Community />
      case "events":
        return <Events />
      case "help":
        return <HelpAndSupport />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderActiveSection()}
    </DashboardLayout>
  )
}
