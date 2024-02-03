import FloatingMenuButton from "../navigation/floating-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const MobileProfileSection = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <FloatingMenuButton />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="py-6 space-y-3">
            {/* TODO: Add mobile profile section */}
            Mobile Profile Section
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};