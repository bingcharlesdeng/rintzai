import { db, doc, getDoc } from '../../firebase/firebase';

export const fetchUserProgressData = async (userId) => {
  console.log('Fetching progress data for user:', userId);
  try {
    const userDocRef = doc(db, 'userProgress', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log('Progress data found:', userDocSnap.data());
      return userDocSnap.data();
    } else {
      console.log('No progress data found for user');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user progress data:', error);
    throw error;
  }
};

export const analyzeProgressData = (data) => {
  console.log('Analyzing progress data:', data);
  
  const analyzedData = {
    ...data,
    wellbeingTrend: calculateTrend(data.overallWellbeing),
    wellbeingChange: calculatePercentageChange(data.overallWellbeing),
    moodStabilityTrend: calculateMoodStability(data.moodScores),
    moodStabilityChange: calculatePercentageChange(data.moodScores),
    anxietyTrend: calculateTrend(data.anxietyScores),
    anxietyChange: calculatePercentageChange(data.anxietyScores),
    resilienceScore: calculateResilienceScore(data),
    mentalHealthIndex: calculateMentalHealthIndex(data),
    moodPatterns: analyzeMoodPatterns(data.moodScores),
    moodTriggers: identifyMoodTriggers(data),
    emotionalIntelligenceScore: calculateEmotionalIntelligenceScore(data),
    habitImpactOnWellbeing: analyzeHabitImpact(data),
    recommendedNewHabit: suggestNewHabit(data),
    longestHabitStreak: calculateLongestStreak(data.habitData),
    sentimentTrend: analyzeSentimentTrend(data.journalEntries),
    emotionalDepthScore: calculateEmotionalDepthScore(data.journalEntries),
    writingFrequency: analyzeWritingFrequency(data.journalEntries),
    timeOfDayPattern: analyzeTimeOfDayPattern(data.journalEntries),
    goalAchievementTrend: analyzeGoalAchievementTrend(data.goalData),
    averageTimeToCompleteGoal: calculateAverageTimeToCompleteGoal(data.goalData),
    goalConsistencyScore: calculateGoalConsistencyScore(data.goalData),
    recommendedFocusArea: suggestFocusArea(data),
    therapyProgressTrend: analyzeTherapyProgressTrend(data.therapyData),
    therapyEngagementScore: calculateTherapyEngagementScore(data.therapyData),
    effectiveTechniques: identifyEffectiveTechniques(data.therapyData),
  };

  console.log('Analyzed data:', analyzedData);
  return analyzedData;
};

const calculateTrend = (data) => {
  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  return secondAvg > firstAvg ? 'improved' : 'declined';
};

const calculatePercentageChange = (data) => {
  const first = data[0];
  const last = data[data.length - 1];
  return ((last - first) / first * 100).toFixed(2);
};

const calculateMoodStability = (moodScores) => {
  const variance = moodScores.reduce((sum, score) => sum + Math.pow(score - average(moodScores), 2), 0) / moodScores.length;
  return variance < 2 ? 'stable' : 'variable';
};

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const calculateResilienceScore = (data) => {
  let score = 0;
  score += data.moodStabilityTrend === 'stable' ? 3 : 1;
  score += data.anxietyTrend === 'improved' ? 3 : 1;
  score += data.overallHabitAdherence > 70 ? 3 : 1;
  score += data.goalCompletionRate > 50 ? 1 : 0;
  return Math.min(score, 10);
};

const calculateMentalHealthIndex = (data) => {
  let index = 0;
  index += data.overallWellbeing[data.overallWellbeing.length - 1] * 0.3;
  index += (10 - average(data.anxietyScores)) * 0.2;
  index += data.resilienceScore * 0.2;
  index += data.emotionalIntelligenceScore * 0.15;
  index += data.therapyEngagementScore * 0.15;
  return Math.round(index * 10);
};

// Implement the following functions based on your specific requirements
const analyzeMoodPatterns = (moodScores) => {
  // Implementation
};

const identifyMoodTriggers = (data) => {
  // Implementation
};

const calculateEmotionalIntelligenceScore = (data) => {
  // Implementation
};

const analyzeHabitImpact = (data) => {
  // Implementation
};

const suggestNewHabit = (data) => {
  // Implementation
};

const calculateLongestStreak = (habitData) => {
  // Implementation
};

const analyzeSentimentTrend = (journalEntries) => {
  // Implementation
};

const calculateEmotionalDepthScore = (journalEntries) => {
  // Implementation
};

const analyzeWritingFrequency = (journalEntries) => {
  // Implementation
};

const analyzeTimeOfDayPattern = (journalEntries) => {
  // Implementation
};

const analyzeGoalAchievementTrend = (goalData) => {
  // Implementation
};

const calculateAverageTimeToCompleteGoal = (goalData) => {
  // Implementation
};

const calculateGoalConsistencyScore = (goalData) => {
  // Implementation
};

const suggestFocusArea = (data) => {
  // Implementation
};

const analyzeTherapyProgressTrend = (therapyData) => {
  // Implementation
};

const calculateTherapyEngagementScore = (therapyData) => {
  // Implementation
};

const identifyEffectiveTechniques = (therapyData) => {
  // Implementation
};

console.log('progressService loaded');

export default {
  fetchUserProgressData,
  analyzeProgressData
};