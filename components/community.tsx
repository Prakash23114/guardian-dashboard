"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Share2,
  BookOpen,
  Trophy,
  Calendar,
  MapPin,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Star,
  ThumbsUp,
  MessageSquare,
  Eye,
} from "lucide-react"

// Mock community data
const communityData = {
  groups: [
    {
      id: 1,
      name: "Computer Science Parents",
      description: "Connect with other parents of CS students",
      members: 156,
      posts: 89,
      category: "Academic",
      image: "/computer-science-abstract.png",
      joined: true,
      activity: "high",
    },
    {
      id: 2,
      name: "Engineering College Community",
      description: "General discussions about college life and academics",
      members: 324,
      posts: 201,
      category: "General",
      image: "/engineering-college.jpg",
      joined: true,
      activity: "high",
    },
    {
      id: 3,
      name: "Career Guidance Network",
      description: "Share career opportunities and guidance",
      members: 89,
      posts: 45,
      category: "Career",
      image: "/career-guidance.jpg",
      joined: false,
      activity: "medium",
    },
  ],
  posts: [
    {
      id: 1,
      author: "Priya Patel",
      authorAvatar: "/indian-mother.jpg",
      group: "Computer Science Parents",
      title: "Tips for improving programming skills",
      content:
        "My son has been struggling with data structures. What resources have worked best for your children? Looking for recommendations on online courses or books.",
      timestamp: "2024-01-22T14:30:00Z",
      likes: 12,
      comments: 8,
      views: 45,
      tags: ["programming", "data-structures", "resources"],
      pinned: false,
    },
    {
      id: 2,
      author: "Rajesh Kumar",
      authorAvatar: "/indian-father.jpg",
      group: "Engineering College Community",
      title: "Internship opportunities in tech companies",
      content:
        "Sharing a list of companies that are currently offering internships for engineering students. My daughter got selected at TCS through campus placement.",
      timestamp: "2024-01-22T11:15:00Z",
      likes: 28,
      comments: 15,
      views: 89,
      tags: ["internship", "placement", "tech"],
      pinned: true,
    },
    {
      id: 3,
      author: "Sunita Sharma",
      authorAvatar: "/indian-mother-2.jpg",
      group: "Computer Science Parents",
      title: "Study schedule that worked for my child",
      content:
        "Sharing the daily study routine that helped my son improve his CGPA from 7.5 to 8.8. Consistency is key!",
      timestamp: "2024-01-21T16:45:00Z",
      likes: 35,
      comments: 22,
      views: 156,
      tags: ["study-tips", "schedule", "academic"],
      pinned: false,
    },
  ],
  events: [
    {
      id: 1,
      title: "Parent-Student Career Fair",
      description: "Meet industry professionals and explore career opportunities",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      location: "College Auditorium",
      organizer: "Career Services",
      attendees: 89,
      interested: 156,
      category: "Career",
    },
    {
      id: 2,
      title: "Academic Excellence Workshop",
      description: "Strategies for academic success and stress management",
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall",
      organizer: "Student Counseling",
      attendees: 45,
      interested: 78,
      category: "Academic",
    },
  ],
}

export function Community() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [newPostContent, setNewPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

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

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Community</h1>
          <p className="text-muted-foreground text-pretty">
            Connect with other parents, share experiences, and build a supportive network.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>Share your thoughts with the community</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Post title..." />
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between">
                  <Button variant="outline">Add Tags</Button>
                  <Button>Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Join Group
          </Button>
        </div>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 p-0 focus-visible:ring-0"
                    />
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Posts */}
              <div className="space-y-4">
                {communityData.posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{post.author}</h4>
                            <p className="text-sm text-muted-foreground">
                              in {post.group} • {formatTime(post.timestamp)}
                            </p>
                          </div>
                        </div>
                        {post.pinned && (
                          <Badge variant="secondary" className="text-xs">
                            Pinned
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-sm">{post.content}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">#placement-season</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">#exam-preparation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">#internship-tips</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communityData.groups
                    .filter((g) => g.joined)
                    .map((group) => (
                      <div key={group.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={group.image || "/placeholder.svg"} />
                          <AvatarFallback>{group.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{group.name}</p>
                          <p className="text-xs text-muted-foreground">{group.members} members</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {communityData.groups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.image || "/placeholder.svg"} />
                      <AvatarFallback>{group.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{group.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{group.members} members</span>
                    <span>{group.posts} posts</span>
                    <Badge className={getActivityColor(group.activity)}>{group.activity} activity</Badge>
                  </div>
                  <Button className="w-full" variant={group.joined ? "outline" : "default"}>
                    {group.joined ? "Joined" : "Join Group"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {communityData.events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.organizer}</CardDescription>
                    </div>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{event.attendees} attending</span>
                    <span>{event.interested} interested</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Attend</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Interested
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Shared study resources and materials from the community
                </p>
                <Button className="w-full bg-transparent" variant="outline">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Inspiring stories from parents and students</p>
                <Button className="w-full bg-transparent" variant="outline">
                  Read Stories
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Expert Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Tips and advice from education experts</p>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Advice
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
