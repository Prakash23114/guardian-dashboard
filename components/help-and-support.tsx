"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Clock,
  AlertCircle,
  Star,
  ThumbsUp,
  Send,
} from "lucide-react"

// Mock support data
const supportData = {
  faqs: [
    {
      id: 1,
      category: "Academic",
      question: "How can I track my child's academic progress?",
      answer:
        "You can track your child's academic progress through the Dashboard Overview and Performance Analysis sections. These provide real-time updates on grades, attendance, and overall performance metrics.",
      helpful: 45,
      views: 234,
    },
    {
      id: 2,
      category: "Fees",
      question: "How do I make fee payments online?",
      answer:
        "Navigate to the Fees & Payments section where you can view pending fees and make secure online payments using various payment methods including credit cards, debit cards, and net banking.",
      helpful: 38,
      views: 189,
    },
    {
      id: 3,
      category: "Communication",
      question: "How can I communicate with my child's teachers?",
      answer:
        "Use the Communication section to send messages directly to teachers, schedule meetings, and participate in parent-teacher conferences. You can also view announcements and updates from the college.",
      helpful: 52,
      views: 167,
    },
    {
      id: 4,
      category: "Technical",
      question: "I'm having trouble logging into my account",
      answer:
        "If you're having login issues, try resetting your password using the 'Forgot Password' link. If the problem persists, contact our technical support team at support@college.edu or call +91-XXX-XXX-XXXX.",
      helpful: 29,
      views: 145,
    },
  ],
  tickets: [
    {
      id: 1,
      title: "Unable to view attendance records",
      description: "The attendance section is not loading properly for my child Prakash Kumar",
      status: "open",
      priority: "medium",
      category: "Technical",
      createdAt: "2024-01-22T10:30:00Z",
      updatedAt: "2024-01-22T14:15:00Z",
      assignedTo: "Technical Support",
    },
    {
      id: 2,
      title: "Fee payment confirmation not received",
      description: "I made a payment yesterday but haven't received confirmation email",
      status: "resolved",
      priority: "high",
      category: "Fees",
      createdAt: "2024-01-21T09:15:00Z",
      updatedAt: "2024-01-21T16:30:00Z",
      assignedTo: "Finance Team",
    },
  ],
  guides: [
    {
      id: 1,
      title: "Getting Started with Guardian Dashboard",
      description: "Complete guide to navigating and using all features of the dashboard",
      category: "General",
      type: "video",
      duration: "15 min",
      views: 1234,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Understanding Academic Reports",
      description: "How to interpret your child's academic performance reports",
      category: "Academic",
      type: "pdf",
      pages: 12,
      views: 856,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Setting Up Notifications",
      description: "Configure alerts and notifications for important updates",
      category: "Settings",
      type: "article",
      readTime: "8 min",
      views: 567,
      rating: 4.7,
    },
  ],
}

export function HelpAndSupport() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newTicketTitle, setNewTicketTitle] = useState("")
  const [newTicketDescription, setNewTicketDescription] = useState("")

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "in-progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredFAQs = supportData.faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Help & Support</h1>
          <p className="text-muted-foreground text-pretty">
            Get help with using the Guardian Dashboard and resolve any issues you may have.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>Describe your issue and we'll help you resolve it</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Brief description of your issue..."
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Please provide detailed information about your issue..."
                  value={newTicketDescription}
                  onChange={(e) => setNewTicketDescription(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between">
                  <Button variant="outline">Add Screenshot</Button>
                  <Button>Submit Ticket</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Support
          </Button>
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "academic" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("academic")}
              >
                Academic
              </Button>
              <Button
                variant={selectedCategory === "fees" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("fees")}
              >
                Fees
              </Button>
              <Button
                variant={selectedCategory === "technical" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("technical")}
              >
                Technical
              </Button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about the Guardian Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{faq.category}</Badge>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{faq.views} views</span>
                          <span>{faq.helpful} found helpful</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <div className="space-y-4">
            {supportData.tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          #{ticket.id} - {ticket.title}
                        </CardTitle>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                      <CardDescription>{ticket.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Created: {formatTime(ticket.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Updated: {formatTime(ticket.updatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Assigned to: {ticket.assignedTo}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Add Comment
                    </Button>
                    {ticket.status === "open" && (
                      <Button size="sm" variant="outline">
                        Close Ticket
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportData.guides.map((guide) => (
              <Card key={guide.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {guide.type === "video" && <Video className="h-4 w-4 text-blue-600" />}
                      {guide.type === "pdf" && <FileText className="h-4 w-4 text-red-600" />}
                      {guide.type === "article" && <BookOpen className="h-4 w-4 text-green-600" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{guide.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{guide.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {guide.type === "video" && `${guide.duration} • ${guide.views} views`}
                    {guide.type === "pdf" && `${guide.pages} pages • ${guide.views} downloads`}
                    {guide.type === "article" && `${guide.readTime} read • ${guide.views} views`}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {guide.type === "video" ? "Watch" : guide.type === "pdf" ? "Download" : "Read"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+91-XXX-XXX-XXXX</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@college.edu</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available during business hours</p>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact Form</CardTitle>
                <CardDescription>Send us a message and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your name" />
                <Input placeholder="Your email" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your message..." className="min-h-[100px]" />
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>Help us improve the Guardian Dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Overall satisfaction</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-yellow-500 cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Ease of use</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-yellow-500 cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Feature completeness</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-yellow-500 cursor-pointer" />
                      ))}
                    </div>
                  </div>
                </div>
                <Textarea placeholder="Additional comments..." className="min-h-[80px]" />
                <Button className="w-full">Submit Feedback</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feature Requests</CardTitle>
                <CardDescription>Suggest new features or improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Feature title" />
                <Textarea placeholder="Describe the feature you'd like to see..." className="min-h-[120px]" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notify" />
                  <label htmlFor="notify" className="text-sm">
                    Notify me when this feature is implemented
                  </label>
                </div>
                <Button className="w-full">Submit Request</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
