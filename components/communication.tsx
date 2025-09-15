"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  Calendar,
  Bell,
  Users,
  Search,
  Filter,
  MoreVertical,
  Pin,
  Archive,
  Star,
  Clock,
  CheckCheck,
  Paperclip,
} from "lucide-react"

// Mock communication data
const messagesData = {
  conversations: [
    {
      id: 1,
      type: "teacher",
      name: "Dr. Sarah Johnson",
      role: "Software Engineering Professor",
      avatar: "/female-professor.png",
      lastMessage: "Prakash's performance in the recent project was excellent. Keep up the good work!",
      timestamp: "2024-01-22T10:30:00Z",
      unread: 2,
      online: true,
      subject: "Software Engineering",
    },
    {
      id: 2,
      type: "mentor",
      name: "Rajesh Kumar",
      role: "Academic Mentor",
      avatar: "/male-mentor.jpg",
      lastMessage: "I've scheduled a meeting for tomorrow to discuss Varun's career planning.",
      timestamp: "2024-01-22T09:15:00Z",
      unread: 0,
      online: false,
      subject: "Career Guidance",
    },
    {
      id: 3,
      type: "admin",
      name: "College Administration",
      role: "Administrative Office",
      avatar: "/college-admin.png",
      lastMessage: "Fee payment reminder: Library fee due on February 15th.",
      timestamp: "2024-01-21T16:45:00Z",
      unread: 1,
      online: true,
      subject: "Fee Payment",
    },
    {
      id: 4,
      type: "counselor",
      name: "Ms. Priya Sharma",
      role: "Student Counselor",
      avatar: "/female-counselor.png",
      lastMessage: "Thank you for attending the session. Here are the resources we discussed.",
      timestamp: "2024-01-21T14:20:00Z",
      unread: 0,
      online: true,
      subject: "Counseling Session",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule Released",
      content:
        "The mid-semester examination schedule for all courses has been published. Please check your individual timetables.",
      author: "Academic Office",
      timestamp: "2024-01-22T08:00:00Z",
      priority: "high",
      category: "Academic",
      pinned: true,
      readBy: ["1", "2"],
    },
    {
      id: 2,
      title: "Library Hours Extended During Exam Period",
      content:
        "The library will remain open until 11 PM during the examination period (Feb 1-15) to support student preparation.",
      author: "Library Administration",
      timestamp: "2024-01-21T15:30:00Z",
      priority: "medium",
      category: "Facility",
      pinned: false,
      readBy: ["1"],
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting Scheduled",
      content:
        "Individual parent-teacher meetings are scheduled for February 20-22. Please book your slots through the portal.",
      author: "Academic Coordinator",
      timestamp: "2024-01-20T12:00:00Z",
      priority: "high",
      category: "Meeting",
      pinned: true,
      readBy: [],
    },
  ],
}

const messageHistory = {
  1: [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! I wanted to discuss Prakash's recent project submission.",
      timestamp: "2024-01-22T10:00:00Z",
      type: "received",
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for reaching out. How did he perform?",
      timestamp: "2024-01-22T10:05:00Z",
      type: "sent",
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "Prakash's performance in the recent project was excellent. Keep up the good work!",
      timestamp: "2024-01-22T10:30:00Z",
      type: "received",
    },
  ],
}

export function Communication() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
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

  const filteredConversations = messagesData.conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || conv.type === filterType
    return matchesSearch && matchesFilter
  })

  const sendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      setMessageText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Communication</h1>
          <p className="text-muted-foreground text-pretty">
            Stay connected with teachers, mentors, and college administration.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Message
          </Button>
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 p-0 focus-visible:ring-0"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex gap-1 px-6 pb-3">
                    <Button
                      variant={filterType === "all" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterType("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterType === "teacher" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterType("teacher")}
                    >
                      Teachers
                    </Button>
                    <Button
                      variant={filterType === "mentor" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterType("mentor")}
                    >
                      Mentors
                    </Button>
                  </div>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1">
                      {filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedConversation === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {conversation.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{conversation.name}</h4>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(conversation.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{conversation.role}</p>
                            <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            filteredConversations.find((c) => c.id === selectedConversation)?.avatar ||
                            "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {filteredConversations
                            .find((c) => c.id === selectedConversation)
                            ?.name.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {filteredConversations.find((c) => c.id === selectedConversation)?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {filteredConversations.find((c) => c.id === selectedConversation)?.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-4">
                        {messageHistory[selectedConversation as keyof typeof messageHistory]?.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.type === "sent" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="font-medium">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search announcements..." className="w-64" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {messagesData.announcements.map((announcement) => (
              <Card key={announcement.id} className={announcement.pinned ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {announcement.pinned && <Pin className="h-4 w-4 text-primary" />}
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{formatTime(announcement.timestamp)}</span>
                          <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{announcement.content}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{announcement.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCheck className="h-4 w-4" />
                      <span>Read by {announcement.readBy.length} guardians</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Meetings
                </CardTitle>
                <CardDescription>Scheduled meetings with teachers and mentors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/male-mentor.jpg" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">Career Planning Discussion</h4>
                    <p className="text-sm text-muted-foreground">with Rajesh Kumar</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>Tomorrow, 2:00 PM</span>
                    </div>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/female-professor.png" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">Project Review</h4>
                    <p className="text-sm text-muted-foreground">with Dr. Sarah Johnson</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>Feb 25, 10:00 AM</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common communication tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message All Teachers
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Parent-Teacher Meeting
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Request Progress Update
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join Parent Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
