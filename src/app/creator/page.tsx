import { CreatorStudio } from '@/components/creator/CreatorStudio';

export const metadata = {
  title: 'Creator Studio | SkillTree',
};

export default function CreatorPage() {
  return (
    // We use a full viewport height container to give the canvas maximum space
    // It's outside the standard layout boundaries by using fixed positioning or simply overriding
    <div className="fixed inset-0 z-50 bg-slate-950">
      <CreatorStudio />
    </div>
  );
}
