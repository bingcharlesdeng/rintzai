import React, { useState } from 'react';
import './SelfAssessment.css';

const assessments = [
  {
    id: 'depression',
    title: 'Depression Screening (PHQ-9)',
    questions: [
      'Little interest or pleasure in doing things',
      'Feeling down, depressed, or hopeless',
      'Trouble falling or staying asleep, or sleeping too much',
      'Feeling tired or having little energy',
      'Poor appetite or overeating',
      'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
      'Trouble concentrating on things, such as reading the newspaper or watching television',
      'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
      'Thoughts that you would be better off dead, or of hurting yourself',
    ],
  },
  {
    id: 'anxiety',
    title: 'Generalized Anxiety Disorder (GAD-7)',
    questions: [
      'Feeling nervous, anxious, or on edge',
      'Not being able to stop or control worrying',
      'Worrying too much about different things',
      'Trouble relaxing',
      'Being so restless that it\'s hard to sit still',
      'Becoming easily annoyed or irritable',
      'Feeling afraid as if something awful might happen',
    ],
  },
];

const SelfAssessment = ({ userData, updateUserData }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleAssessmentSelect = (assessment) => {
    setSelectedAssessment(assessment);
    setAnswers({});
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({ ...answers, [questionIndex]: parseInt(value) });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getAssessmentResult = (score) => {
    if (selectedAssessment.id === 'depression') {
      if (score <= 4) return 'Minimal depression';
      if (score <= 9) return 'Mild depression';
      if (score <= 14) return 'Moderate depression';
      if (score <= 19) return 'Moderately severe depression';
      return 'Severe depression';
    } else if (selectedAssessment.id === 'anxiety') {
      if (score <= 4) return 'Minimal anxiety';
      if (score <= 9) return 'Mild anxiety';
      if (score <= 14) return 'Moderate anxiety';
      return 'Severe anxiety';
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const result = getAssessmentResult(score);
    const assessmentResult = {
      id: selectedAssessment.id,
      title: selectedAssessment.title,
      score,
      result,
      date: new Date(),
    };
    updateUserData({
      assessments: [...(userData.assessments || []), assessmentResult],
    });
    setSelectedAssessment(null);
  };

  if (!selectedAssessment) {
    return (
      <div className="self-assessment">
        <h2>Self-Assessment Tools</h2>
        <div className="assessment-list">
          {assessments.map(assessment => (
            <button key={assessment.id} onClick={() => handleAssessmentSelect(assessment)}>
              {assessment.title}
            </button>
          ))}
        </div>
        {userData.assessments && userData.assessments.length > 0 && (
          <div className="assessment-history">
            <h3>Your Assessment History</h3>
            <ul>
              {userData.assessments.map((assessment, index) => (
                <li key={index}>
                  {assessment.title}: {assessment.result} (Score: {assessment.score}) - {new Date(assessment.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="self-assessment">
      <h2>{selectedAssessment.title}</h2>
      <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      <form onSubmit={(e) => e.preventDefault()}>
        {selectedAssessment.questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            <div className="answer-options">
              {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'].map((option, value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={value}
                    checked={answers[index] === value}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} disabled={Object.keys(answers).length !== selectedAssessment.questions.length}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelfAssessment;
