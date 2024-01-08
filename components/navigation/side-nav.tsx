"use client"

import Link from 'next/link'
import React from 'react'

import { SideNavLinks } from '@/config/navlinks.config'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-3 mr-2">
    {SideNavLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn("bg-secondary text-secondary-foreground p-4 flex w-full items-center rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700", pathname == link.href && "bg-slate-200")}
      >
        {link.label}
      </Link>
    ))}
  </div>
  )
}

export default SideNav