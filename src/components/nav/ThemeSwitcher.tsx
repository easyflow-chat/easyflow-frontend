'use client';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { FunctionComponent, ReactElement } from 'react';

const ThemeSwitcher: FunctionComponent = (): ReactElement => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === 'light' ? (
        <Moon size={20} className="hover:cursor-pointer" onClick={() => setTheme('dark')} />
      ) : (
        <Sun size={20} className="hover:cursor-pointer" onClick={() => setTheme('light')} />
      )}
    </>
  );
};

export default ThemeSwitcher;
