import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    { name: 'default', label: 'Default', icon: <Sun size={20} /> },
    { name: 'dark', label: 'Dark', icon: <Moon size={20} /> },
    { name: 'emerald', label: 'Emerald', icon: <Palette size={20} /> },
    { name: 'glossy', label: 'Glossy', icon: <Palette size={20} /> },
    { name: 'cyberpunk', label: 'Cyberpunk', icon: <Palette size={20} /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {themes.find((t) => t.name === theme)?.icon || <Sun size={20} />}
          <span className="hidden sm:inline">{themes.find((t) => t.name === theme)?.label || 'Theme'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-theme-card-bg border-theme-border text-theme-text-primary">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name as 'default' | 'dark' | 'emerald' | 'glossy' | 'cyberpunk')}
            className="flex items-center gap-2 cursor-pointer hover:bg-theme-border focus:bg-theme-border"
          >
            {t.icon}
            <span>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
