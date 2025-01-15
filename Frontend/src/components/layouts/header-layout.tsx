'use client';

import { ThemeToggle } from '../ui/theme-toggle';
import { LanguageSwitcher } from '../ui/language-switcher';
import { NotificationsPopover } from '../ui/notifications-popover';
import { LogoutButton } from '../ui/logout-button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '../ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import React from 'react';
import { Box } from '../ui';
import { RoleBasedHeader } from '../ui/role-based-header';
import { Role } from '@/types/role';

type HeaderLayoutProps = {
  role: Role;
  userId: string;
};

export const HeaderLayout = ({ role, userId }: HeaderLayoutProps) => {
  return (
    <header className="flex items-center justify-between p-6 gap-4">
      <div className="hidden lg:flex items-center gap-4 justify-center w-full">
        <ThemeToggle />
        <LanguageSwitcher />
        <RoleBasedHeader role={role} userId={userId} />
        <NotificationsPopover />
        <LogoutButton />
      </div>
      <div className="lg:hidden flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuItem asChild>
              <Box>
                <RoleBasedHeader role={role} userId={userId} />
              </Box>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Box className="flex justify-around">
                <ThemeToggle />
                <LanguageSwitcher />
                <NotificationsPopover />
              </Box>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Box className="flex justify-center p-4">
                <LogoutButton />
              </Box>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
