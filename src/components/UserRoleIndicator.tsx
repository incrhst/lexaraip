import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  role: 'admin' | 'applicant' | 'public';
  className?: string;
}

export default function UserRoleIndicator({ role, className }: Props) {
  const roleLabels = {
    admin: 'Administrator',
    applicant: 'Applicant',
    public: 'Public User',
  };

  const roleStyles = {
    admin: 'bg-primary text-background',
    applicant: 'bg-primary-light text-background',
    public: 'bg-primary-lighter text-background',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Shield className="h-4 w-4" />
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        roleStyles[role]
      )}>
        {roleLabels[role]}
      </span>
    </div>
  );
}