"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { useState } from "react"

export function MyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    relation: "Father",
    occupation: "Software Engineer",
    emergencyContact: "+91 9876543211",
    bio: "Dedicated father of two engineering students. Actively involved in their academic progress and development.",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">My Profile</h1>
        <p className="text-muted-foreground text-pretty">Manage your personal information and account settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/guardian-profile.jpg" alt="Guardian" />
                <AvatarFallback className="text-lg">RK</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{profileData.name}</CardTitle>
            <CardDescription>{profileData.relation}</CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto">
              Guardian Account
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-pretty">{profileData.address}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Account Statistics</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Children:</span>
                  <span className="ml-1 font-medium">2</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="ml-1 font-medium">Jan 2023</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.name}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="relation">Relation</Label>
                {isEditing ? (
                  <Input
                    id="relation"
                    value={profileData.relation}
                    onChange={(e) => setProfileData({ ...profileData, relation: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.relation}</div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.phone}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  rows={2}
                />
              ) : (
                <div className="p-2 bg-muted rounded-md">{profileData.address}</div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                {isEditing ? (
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.occupation}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                {isEditing ? (
                  <Input
                    id="emergency"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profileData.emergencyContact}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={3}
                />
              ) : (
                <div className="p-2 bg-muted rounded-md">{profileData.bio}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
