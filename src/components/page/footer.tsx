import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer id="about" className="bg-card/50 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="text-4xl" />
          <h3 className="font-headline text-2xl font-bold">
            NS Fashion Wear
          </h3>
          <p className="font-body text-base italic text-muted-foreground">
            “Style for Every Day & Every Occasion”
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Main Boulevard, Lahore, Pakistan
          </p>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6">
            <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} NS Fashion Wear. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
