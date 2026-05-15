import { RecruiterDashboard } from '@/components/recruit/RecruiterDashboard';

export const metadata = {
  title: 'Talent Intelligence | SkillTree',
};

export default function TalentPage() {
  return (
    <div className="pt-16 min-h-screen bg-slate-950">
      <RecruiterDashboard />
    </div>
  );
}
