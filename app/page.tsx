'use client';

import React from 'react';
import { Card } from "@/components/ui/card"
import { SetupComponent } from '@/components/Setup';

// ... tokens array from Leaderboard ...

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <SetupComponent />
    </div>
  );
}