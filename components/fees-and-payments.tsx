"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Receipt,
  Users,
  DollarSign,
} from "lucide-react"

// Mock fees and payment data
const feesData = {
  1: {
    name: "Prakash Kumar",
    rollNo: "CS21B1001",
    totalFees: 120000,
    paidAmount: 112000,
    pendingAmount: 8000,
    installments: [
      {
        id: 1,
        name: "Semester 6 - Tuition Fee",
        amount: 50000,
        dueDate: "2024-01-15",
        status: "paid",
        paidDate: "2024-01-10",
        receiptId: "RCP001",
      },
      {
        id: 2,
        name: "Semester 6 - Lab Fee",
        amount: 15000,
        dueDate: "2024-01-15",
        status: "paid",
        paidDate: "2024-01-10",
        receiptId: "RCP002",
      },
      {
        id: 3,
        name: "Semester 6 - Library Fee",
        amount: 5000,
        dueDate: "2024-02-15",
        status: "pending",
        paidDate: null,
        receiptId: null,
      },
      {
        id: 4,
        name: "Semester 6 - Exam Fee",
        amount: 3000,
        dueDate: "2024-03-15",
        status: "pending",
        paidDate: null,
        receiptId: null,
      },
    ],
    paymentHistory: [
      {
        id: 1,
        date: "2024-01-10",
        amount: 65000,
        description: "Semester 6 - Tuition & Lab Fee",
        method: "Online Banking",
        transactionId: "TXN123456",
      },
      {
        id: 2,
        date: "2023-08-15",
        amount: 47000,
        description: "Semester 5 - Full Payment",
        method: "UPI",
        transactionId: "TXN123455",
      },
    ],
  },
  2: {
    name: "Varun Sharma",
    rollNo: "ME21B2045",
    totalFees: 110000,
    paidAmount: 103000,
    pendingAmount: 7000,
    installments: [
      {
        id: 1,
        name: "Semester 4 - Tuition Fee",
        amount: 45000,
        dueDate: "2024-01-15",
        status: "paid",
        paidDate: "2024-01-12",
        receiptId: "RCP003",
      },
      {
        id: 2,
        name: "Semester 4 - Lab Fee",
        amount: 12000,
        dueDate: "2024-01-15",
        status: "paid",
        paidDate: "2024-01-12",
        receiptId: "RCP004",
      },
      {
        id: 3,
        name: "Semester 4 - Sports Fee",
        amount: 4000,
        dueDate: "2024-02-15",
        status: "pending",
        paidDate: null,
        receiptId: null,
      },
      {
        id: 4,
        name: "Semester 4 - Exam Fee",
        amount: 3000,
        dueDate: "2024-03-15",
        status: "pending",
        paidDate: null,
        receiptId: null,
      },
    ],
    paymentHistory: [
      {
        id: 1,
        date: "2024-01-12",
        amount: 57000,
        description: "Semester 4 - Tuition & Lab Fee",
        method: "Credit Card",
        transactionId: "TXN123457",
      },
      {
        id: 2,
        date: "2023-08-20",
        amount: 46000,
        description: "Semester 3 - Full Payment",
        method: "Online Banking",
        transactionId: "TXN123458",
      },
    ],
  },
}

export function FeesAndPayments() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [combinedView, setCombinedView] = useState<boolean>(false)

  const currentData = feesData[selectedChild as keyof typeof feesData]
  const otherChildData = feesData[selectedChild === 1 ? 2 : 1]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const totalPendingBoth = feesData[1].pendingAmount + feesData[2].pendingAmount

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Fees & Payments</h1>
          <p className="text-muted-foreground text-pretty">
            Track fee status, download receipts, and manage payments for each child.
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
            Combined View
          </Button>
        </div>
      </div>

      {combinedView ? (
        /* Combined Payment View */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Combined Payment Summary
              </CardTitle>
              <CardDescription>Total fees and payments across both children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ₹{(feesData[1].totalFees + feesData[2].totalFees).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    ₹{(feesData[1].paidAmount + feesData[2].paidAmount).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">₹{totalPendingBoth.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Pending</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Payment Progress</span>
                  <span className="text-sm">
                    {Math.round(
                      ((feesData[1].paidAmount + feesData[2].paidAmount) /
                        (feesData[1].totalFees + feesData[2].totalFees)) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    ((feesData[1].paidAmount + feesData[2].paidAmount) /
                      (feesData[1].totalFees + feesData[2].totalFees)) *
                    100
                  }
                  className="h-3"
                />
              </div>
              <div className="mt-6 flex gap-2">
                <Button className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Combined Amount (₹{totalPendingBoth.toLocaleString()})
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Combined Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Individual Child Summaries */}
          <div className="grid gap-6 lg:grid-cols-2">
            {[feesData[1], feesData[2]].map((data, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{data.name}</CardTitle>
                  <CardDescription>{data.rollNo}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">₹{data.totalFees.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">₹{data.paidAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Paid</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">₹{data.pendingAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                  </div>
                  <Progress value={(data.paidAmount / data.totalFees) * 100} className="h-2" />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Pay ₹{data.pendingAmount.toLocaleString()}
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Individual Child View */
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installments">Installments</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Payment Summary */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₹{currentData.totalFees.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Academic Year 2023-24</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹{currentData.paidAmount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((currentData.paidAmount / currentData.totalFees) * 100)}% completed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{currentData.pendingAmount.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {currentData.installments.filter((i) => i.status === "pending").length} installments pending
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Due</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {currentData.installments.find((i) => i.status === "pending")?.dueDate || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">Next payment due</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Progress</CardTitle>
                <CardDescription>Track your fee payment completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">
                      {Math.round((currentData.paidAmount / currentData.totalFees) * 100)}%
                    </span>
                  </div>
                  <Progress value={(currentData.paidAmount / currentData.totalFees) * 100} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Paid:</span>
                      <span className="ml-2 font-medium text-green-600">
                        ₹{currentData.paidAmount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="ml-2 font-medium text-orange-600">
                        ₹{currentData.pendingAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Pending Amount (₹{currentData.pendingAmount.toLocaleString()})
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Fee Structure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installments" className="space-y-4">
            <div className="space-y-4">
              {currentData.installments.map((installment) => (
                <Card key={installment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{installment.name}</CardTitle>
                        <CardDescription>Due: {installment.dueDate}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(installment.status)}
                        <Badge className={getStatusColor(installment.status)}>{installment.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">₹{installment.amount.toLocaleString()}</div>
                        {installment.paidDate && (
                          <p className="text-sm text-muted-foreground">Paid on: {installment.paidDate}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {installment.status === "paid" ? (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </Button>
                        ) : (
                          <Button size="sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All previous payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                          <Receipt className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.date} • {payment.method} • {payment.transactionId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{payment.amount.toLocaleString()}</div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
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
