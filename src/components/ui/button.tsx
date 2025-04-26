// components/ui/button.tsx
import React from 'react'
import { cn } from '@/lib/utils' // إن لم يوجد، أزل cn واستخدم className مباشرة

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition',
        className
      )}
      {...props}
    />
  )
}

export { Button }
