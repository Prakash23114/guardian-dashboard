"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, MapPin, Users, Plus, Search, Bell, Star, Share2, Download } from "lucide-react"

// Mock events data
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      description: "Individual meetings with subject teachers to discuss academic progress",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      location: "College Campus - Various Classrooms",
      organizer: "Academic Office",
      category: "Academic",
      priority: "high",
      attendees: 156,
      maxAttendees: 200,
      registered: true,
      reminder: true,
      children: ["Prakash Kumar", "Varun Sharma"],
    },
    {
      id: 2,
      title: "Technical Symposium 2024",
      description: "Annual technical event featuring project exhibitions and competitions",
      date: "2024-02-20",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      organizer: "Computer Science Department",
      category: "Technical",
      priority: "medium",
      attendees: 89,
      maxAttendees: 150,
      registered: false,
      reminder: false,
      children: ["Prakash Kumar"],
    },
    {
      id: 3,
      title: "Career Guidance Workshop",
      description: "Industry experts sharing insights on career opportunities in technology",
      date: "2024-02-25",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall",
      organizer: "Placement Cell",
      category: "Career",
      priority: "high",
      attendees: 67,
      maxAttendees: 100,
      registered: true,
      reminder: true,
      children: ["Prakash Kumar", "Varun Sharma"],
    },
  ],
  past: [
    {
      id: 4,
      title: "Orientation Program",
      description: "Welcome session for new academic year",
      date: "2024-01-10",
      time: "10:00 AM - 12:00 PM",
      location: "Main Auditorium",
      organizer: "Student Affairs",
      category: "General",
      priority: "medium",
      attendees: 234,
      maxAttendees: 250,
      registered: true,
      attended: true,
    },
    {
      id: 5,
      title: "Sports Day",
      description: "Annual sports competition and cultural activities",
      date: "2024-01-20",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex",
      organizer: "Sports Committee",
      category: "Sports",
      priority: "low",
      attendees: 189,
      maxAttendees: 200,
      registered: true,
      attended: false,
    },
  ],
}

export function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Technical":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Career":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Sports":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredUpcomingEvents = eventsData.upcoming.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Events</h1>
          <p className="text-muted-foreground text-pretty">
            Stay updated with college events, meetings, and important activities.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
              >
                All
              </Button>
              <Button
                variant={categoryFilter === "academic" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("academic")}
              >
                Academic
              </Button>
              <Button
                variant={categoryFilter === "technical" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("technical")}
              >
                Technical
              </Button>
              <Button
                variant={categoryFilter === "career" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("career")}
              >
                Career
              </Button>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredUpcomingEvents.map((event) => (
              <Card key={event.id} className={event.priority === "high" ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge className={getPriorityColor(event.priority)}>{event.priority}</Badge>
                        <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                      </div>
                      <CardDescription className="text-base">{event.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {event.reminder && <Bell className="h-4 w-4 text-primary" />}
                      {event.registered && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {event.attendees}/{event.maxAttendees} registered
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">by {event.organizer}</span>
                    </div>
                    <div className="flex gap-2">
                      {!event.registered ? (
                        <Button size="sm">Register</Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          Registered
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {event.children && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Relevant for: {event.children.join(", ")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                  <CardDescription>Click on a date to view events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Events for {selectedDate?.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {eventsData.upcoming
                      .filter((event) => {
                        const eventDate = new Date(event.date)
                        return selectedDate && eventDate.toDateString() === selectedDate.toDateString()
                      })
                      .map((event) => (
                        <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 rounded-full bg-primary/10">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                          <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                        </div>
                      ))}
                    {eventsData.upcoming.filter((event) => {
                      const eventDate = new Date(event.date)
                      return selectedDate && eventDate.toDateString() === selectedDate.toDateString()
                    }).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No events scheduled for this date</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="space-y-4">
            {eventsData.past.map((event) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                        {event.attended && <Badge variant="outline">Attended</Badge>}
                      </div>
                      <CardDescription className="text-base">{event.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.attendees} attended</span>
                      </div>
                      <span className="text-sm text-muted-foreground">by {event.organizer}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Materials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Reminders</CardTitle>
                <CardDescription>Events you've set reminders for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventsData.upcoming
                  .filter((event) => event.reminder)
                  .map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Bell className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive event notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <Button size="sm" variant="outline">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS reminders</span>
                    <Button size="sm" variant="outline">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Calendar sync</span>
                    <Button size="sm" variant="outline">
                      Setup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
