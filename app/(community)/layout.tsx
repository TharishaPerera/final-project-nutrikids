import { MobileProfileSection } from '@/components/community/mobile-profile-section'
import { ProfileSection } from '@/components/community/profile-section'
import { Footer } from '@/components/navigation/footer'
import { Navbar } from '@/components/navigation/navbar'
import React from 'react'

interface CommunityLayoutProps {
    children?: React.ReactNode
}

const CommunityLayout: React.FC<CommunityLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4">
          <Navbar />
        </div>
      </header>
      <div className="grid flex-1 px-6 md:px-32 gap-6 md:grid-cols-[300px_1fr]">
        <aside className="hidden w-[300px] flex-col md:flex border-r ">
          <ProfileSection />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <MobileProfileSection />
      <Footer />
    </div>
  )
}

export default CommunityLayout