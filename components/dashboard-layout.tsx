"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  CreditCard,
  FileText,
  AlertTriangle,
  MessageSquare,
  Globe,
  CalendarDays,
  HelpCircle,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: User },
  { id: "children", label: "Children Overview", icon: Users },
  { id: "subjects", label: "Subjects & Courses", icon: BookOpen },
  { id: "performance", label: "Performance & Analysis", icon: TrendingUp },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "fees", label: "Fees & Payments", icon: CreditCard },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "alerts", label: "Alerts & Risk Factors", icon: AlertTriangle },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "community", label: "Community", icon: Globe },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo and title */}
          <div className="flex items-center gap-3 mr-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Guardian Dashboard</h1>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Low attendance alert</p>
                    <p className="text-xs text-muted-foreground">Prakash's attendance is below 75%</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Fee payment due</p>
                    <p className="text-xs text-muted-foreground">Semester fee due in 3 days</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Parent meeting scheduled</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/guardian-profile.jpg" alt="Guardian" />
                    <AvatarFallback>GD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSectionChange("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col pt-16 lg:pt-0">
            <nav className="flex-1 space-y-1 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-11",
                      activeSection === item.id && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                    onClick={() => {
                      onSectionChange(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-6 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 Guardian Dashboard</span>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              About
            </a>
          </div>
          <div className="text-sm text-muted-foreground">Built with ❤️ for guardians</div>
        </div>
      </footer>
    </div>
  )
}
