'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Home, PenSquare, Image as ImageIcon, Music, BookHeart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDevAuth } from '@/context/dev-auth-context'
import DevAuth from '@/components/dev-auth'

const devNavItems = [
  { href: '/developer', label: 'Dashboard', icon: Home },
  { href: '/developer/content', label: 'Content', icon: PenSquare },
]

const mainNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Heart },
    { href: '/soundboard', label: 'Soundboard', icon: Music },
    { href: '/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/letters', label: 'Letters', icon: BookHeart },
]

export default function DevLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isAuthenticated } = useDevAuth();

  if (!isAuthenticated) {
    return <DevAuth />;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard">
                <Heart className="text-accent" />
              </Link>
            </Button>
            <span className="font-headline text-lg text-sidebar-foreground">Dev Area</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarMenu>
                    {devNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href} className="w-full">
                            <SidebarMenuButton isActive={pathname === item.href}>
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>App Preview</SidebarGroupLabel>
                <SidebarMenu>
                    {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href} className="w-full">
                            <SidebarMenuButton isActive={pathname === item.href}>
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
