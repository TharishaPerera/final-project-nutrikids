import FloatingMenuButton from "@/components/navigation/floating-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProfileSection } from "@/components/community/profile-section";

export const MobileProfileSection = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <FloatingMenuButton screen="xl" />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="py-6 space-y-3">
            {/* TODO: Add mobile profile section */}
            <ProfileSection />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
