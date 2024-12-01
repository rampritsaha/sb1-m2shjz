'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scissors } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/mobile-nav';
import { cn } from '@/lib/utils';

const routes = [
  {
    href: '/style-advisor',
    label: 'Style Advisor',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <MobileNav />
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Scissors className="h-6 w-6" />
            <span className="font-bold hidden sm:inline-block">
              StyleAI Salon
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === route.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link href="/style-advisor">Try AI Style Advisor</Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
