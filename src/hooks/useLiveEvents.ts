import { useEffect } from 'react';
import { useEventStore } from '../store/eventStore';

// Simulated hook to fetch live events, usually would hit a real backend
export function useLiveEvents() {
  const { 
    activeSeason, 
    activeEvents, 
    communityGoals, 
    dailyMissions, 
    weeklyMissions
  } = useEventStore();

  useEffect(() => {
    // In a real app, we would fetch current events, season, and goals from an API here
    // e.g., const res = await fetch('/api/events/live');
    // const data = await res.json();
    // setSeason(data.season);
    // setEvents(data.events);
    // updateCommunityGoal(data.communityGoal.id, data.communityGoal.currentCount);
    
    // For simulation, we randomly "tick" the community goal every few seconds
    const interval = setInterval(() => {
      const { updateCommunityGoal, communityGoals } = useEventStore.getState();
      if (communityGoals.length > 0) {
        // Randomly add 5 to 50 to the community goal
        const randomAdd = Math.floor(Math.random() * 45) + 5;
        updateCommunityGoal(communityGoals[0].id, randomAdd);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    activeSeason,
    activeEvents,
    communityGoals,
    dailyMissions,
    weeklyMissions
  };
}
