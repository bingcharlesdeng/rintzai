import { db, doc, getDoc, setDoc, updateDoc, collection, addDoc } from '../../firebase/firebase';

export const fetchUserRecommendations = async (userId) => {
  console.log('Fetching user data for recommendations:', userId);
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log('User data found:', userDocSnap.data());
      return userDocSnap.data();
    } else {
      console.log('No user data found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const generateRecommendations = async (userData) => {
  console.log('Generating recommendations based on user data:', userData);

  const userPreferences = userData.preferences || {};
  const userMood = userData.currentMood || 'neutral';
  const userActivity = userData.activityLevel || 'moderate';

  const recommendations = {
    dailyTip: generateDailyTip(userPreferences),
    activitySuggestions: generateActivitySuggestions(userActivity, userPreferences),
    moodBasedRecommendations: generateMoodBasedRecommendations(userMood, userPreferences),
    longTermGoals: generateLongTermGoals(userPreferences),
    customizedPlan: generateCustomizedPlan(userData),
  };

  console.log('Generated recommendations:', recommendations);
  return recommendations;
};

const generateDailyTip = (preferences) => {
  const tips = [
    {
      id: 'tip1',
      tip: "Practice mindfulness for 10 minutes today",
      category: "Mindfulness",
      explanation: "Mindfulness can help reduce stress and improve focus.",
      actionSteps: ["Find a quiet place", "Sit comfortably", "Focus on your breath", "Gently redirect your thoughts when they wander"]
    },
    {
      id: 'tip2',
      tip: "Express gratitude for three things in your life",
      category: "Gratitude",
      explanation: "Practicing gratitude can boost mood and overall well-being.",
      actionSteps: ["Reflect on your day", "Identify three positive things", "Write them down", "Consider why you're grateful for each"]
    },
    {
      id: 'tip3',
      tip: "Take a 15-minute nature walk",
      category: "Physical Activity",
      explanation: "Nature walks can reduce stress and improve mental clarity.",
      actionSteps: ["Find a nearby park or green space", "Leave your phone behind", "Walk at a comfortable pace", "Pay attention to your surroundings"]
    }
  ];

  const filteredTips = tips.filter(tip => !preferences.dislikedCategories || !preferences.dislikedCategories.includes(tip.category));
  return filteredTips[Math.floor(Math.random() * filteredTips.length)];
};

const generateActivitySuggestions = (activityLevel, preferences) => {
  const activities = [
    {
      id: 'act1',
      name: "Guided Meditation",
      description: "Follow a 15-minute guided meditation for relaxation.",
      duration: 15,
      moodImpact: "Calming",
      intensity: "low"
    },
    {
      id: 'act2',
      name: "Journaling",
      description: "Write about your thoughts and feelings for 20 minutes.",
      duration: 20,
      moodImpact: "Reflective",
      intensity: "low"
    },
    {
      id: 'act3',
      name: "Yoga Session",
      description: "Follow a beginner-friendly yoga routine for 30 minutes.",
      duration: 30,
      moodImpact: "Energizing",
      intensity: "moderate"
    },
    {
      id: 'act4',
      name: "High-Intensity Interval Training",
      description: "Do a 20-minute HIIT workout to boost energy and mood.",
      duration: 20,
      moodImpact: "Energizing",
      intensity: "high"
    }
  ];

  const filteredActivities = activities.filter(activity => 
    (!preferences.dislikedActivities || !preferences.dislikedActivities.includes(activity.name)) &&
    (activityLevel === 'high' || activity.intensity !== 'high')
  );

  return filteredActivities.slice(0, 3);
};

const generateMoodBasedRecommendations = (mood, preferences) => {
  const recommendations = {
    "happy": [
      { id: 'happy1', title: "Gratitude Journal", description: "Write down three things you're grateful for to maintain your positive mood." },
      { id: 'happy2', title: "Share Your Joy", description: "Reach out to a friend or family member and share something positive from your day." }
    ],
    "sad": [
      { id: 'sad1', title: "Mood-Boosting Playlist", description: "Listen to uplifting music that you enjoy." },
      { id: 'sad2', title: "Comfort Activity", description: "Engage in a comforting activity, like reading a favorite book or taking a warm bath." }
    ],
    "anxious": [
      { id: 'anx1', title: "Deep Breathing Exercise", description: "Practice deep breathing for 5 minutes to help calm your nervous system." },
      { id: 'anx2', title: "Progressive Muscle Relaxation", description: "Try a progressive muscle relaxation exercise to release physical tension." }
    ],
    "neutral": [
      { id: 'neu1', title: "Mindful Walking", description: "Take a short walk while focusing on your surroundings and sensations." },
      { id: 'neu2', title: "Creative Expression", description: "Spend some time on a creative activity you enjoy, like drawing or writing." }
    ]
  };

  const filteredRecommendations = recommendations[mood].filter(rec => 
    !preferences.dislikedRecommendations || !preferences.dislikedRecommendations.includes(rec.title)
  );

  return { [mood]: filteredRecommendations };
};

const generateLongTermGoals = (preferences) => {
  const goals = [
    {
      id: 'goal1',
      title: "Improve Sleep Quality",
      description: "Develop a consistent sleep routine to improve overall mental health.",
      progress: 30,
      nextSteps: ["Set a consistent bedtime", "Create a relaxing bedtime routine", "Limit screen time before bed"]
    },
    {
      id: 'goal2',
      title: "Build a Meditation Habit",
      description: "Establish a regular meditation practice to reduce stress and improve focus.",
      progress: 20,
      nextSteps: ["Start with 5 minutes daily", "Gradually increase duration", "Experiment with different techniques"]
    },
    {
      id: 'goal3',
      title: "Enhance Social Connections",
      description: "Strengthen relationships and build a supportive social network.",
      progress: 40,
      nextSteps: ["Reach out to a friend weekly", "Join a club or group with shared interests", "Practice active listening"]
    }
  ];

  const filteredGoals = goals.filter(goal => 
    !preferences.dislikedGoals || !preferences.dislikedGoals.includes(goal.title)
  );

  return filteredGoals;
};

const generateCustomizedPlan = (userData) => {
  const planItems = [
    { id: 'plan1', title: "Morning Meditation", description: "Start your day with a 10-minute meditation session", frequency: "Daily" },
    { id: 'plan2', title: "Gratitude Journaling", description: "Write down three things you're grateful for", frequency: "Daily" },
    { id: 'plan3', title: "Physical Exercise", description: "Engage in 30 minutes of moderate physical activity", frequency: "3 times per week" },
    { id: 'plan4', title: "Social Connection", description: "Reach out to a friend or family member", frequency: "Once a week" },
    { id: 'plan5', title: "Mindful Eating", description: "Practice mindful eating during one meal", frequency: "Daily" },
    { id: 'plan6', title: "Nature Time", description: "Spend 15 minutes outdoors in nature", frequency: "3 times per week" }
  ];

  const filteredItems = planItems.filter(item => 
    (!userData.preferences?.dislikedActivities || !userData.preferences.dislikedActivities.includes(item.title)) &&
    (userData.activityLevel !== 'low' || item.title !== "Physical Exercise")
  );

  const selectedItems = filteredItems.slice(0, 4);

  return {
    id: 'customPlan1',
    overview: "This plan is tailored to help you improve your mental well-being based on your unique needs and preferences.",
    sections: {
      "Daily Practices": selectedItems.filter(item => item.frequency === "Daily"),
      "Weekly Goals": selectedItems.filter(item => item.frequency !== "Daily"),
    },
    nextReviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
};

export const provideFeedback = async (userId, recommendationType, recommendationId, rating) => {
  try {
    const feedbackRef = collection(db, 'userFeedback');
    await addDoc(feedbackRef, {
      userId,
      recommendationType,
      recommendationId,
      rating,
      timestamp: new Date().toISOString()
    });
    console.log('Feedback saved successfully');
    
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedPreferences = updatePreferences(userData.preferences, recommendationType, recommendationId, rating);
      await updateDoc(userRef, { preferences: updatedPreferences });
      console.log('User preferences updated');
    }
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
};

const updatePreferences = (preferences, recommendationType, recommendationId, rating) => {
  if (!preferences) preferences = {};
  if (!preferences[recommendationType]) preferences[recommendationType] = { liked: [], disliked: [] };
  
  if (rating === 'positive') {
    preferences[recommendationType].liked.push(recommendationId);
    preferences[recommendationType].disliked = preferences[recommendationType].disliked.filter(id => id !== recommendationId);
  } else if (rating === 'negative') {
    preferences[recommendationType].disliked.push(recommendationId);
    preferences[recommendationType].liked = preferences[recommendationType].liked.filter(id => id !== recommendationId);
  }
}