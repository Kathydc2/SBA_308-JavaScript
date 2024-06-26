// // The Provided Course Information
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// //The Provided Assignment Group
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    //______ARRAY_____///////////
    assignments: [
    {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
    },
    {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
    },
    {   //____NOT DUE YET______________/////////
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
    }
    ]
};

// The Provided Learner Submission Data (ARRAY that has objects)
const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {   //____________LATE DEDUCT 10% of 150 (15 points)____///////
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  //____Create a function and make sure everything is inside the function below___//

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  const result = []; //PUSH ALL ANSWERS HERE

    //____Make sure Assignment Group matches Course Id__//
    if (AssignmentGroup.course_id !== CourseInfo.id) {
      try{
      throw "Error - AssignmentGroup does not belong to the specified course.";
    } catch (err) {
      console.log(err);
    }
  }
  

  //_____Find the ID's_____//
  const learnerIds = [];
  for (let i = 0; i < LearnerSubmissions.length; i++) {
    const learnerId = LearnerSubmissions[i].learner_id;
    if (CourseInfo.id === 451 && (learnerId === 125 || learnerId === 132)) {
      if (!learnerIds.includes(learnerId)) {
        learnerIds.push(learnerId);
      }
    }
  }

  //_______Helper_____//
  for (let learner_id of learnerIds) {
  const learnerData = {
  id: learner_id,
  avg: 0,
  1: 0,
  2: 0,
  };

  //____CourseInfo Needed__//
  let assignment1Score = 0;
  let assignment1PPoints = 0;
  let assignment2Score = 0;
  let assignment2PPoints = 0;
  let assignment2LatePenalty = 0.1;


   // Calculate scores for assignment 1
  for (let submission of LearnerSubmissions) {
    if (submission.learner_id === learner_id && submission.assignment_id === 1) {
      const assignment = AssignmentGroup.assignments.find(assignmentObject => assignmentObject.id === submission.assignment_id);
      if (assignment) {
        assignment1Score += submission.submission.score;
        assignment1PPoints += assignment.points_possible;
      }
    } else {
      continue;
    }
  }

 // Calculate scores for assignment 2
for (let submission of LearnerSubmissions) {
  if (submission.learner_id === learner_id && submission.assignment_id === 2) {
    try {
      const assignment = AssignmentGroup.assignments.find(assignmentObject => assignmentObject.id === submission.assignment_id);
      if (assignment) {
        const submissionDate = new Date(submission.submission.submitted_at); 
        const dueDate = new Date(assignment.due_at); 
        if (submissionDate > dueDate) {
          let latePenalty = 0;
          if (assignment2LatePenalty) {
            latePenalty = assignment.points_possible * assignment2LatePenalty;
          } else {
            latePenalty = assignment.points_possible * 0.1; // 10% late penalty
          }
          assignment2LatePenalty = latePenalty;
          assignment2Score += submission.submission.score - latePenalty;
        } else {
          assignment2Score += submission.submission.score;
        }
        assignment2PPoints += assignment.points_possible;
      }
    } catch (err) {
      console.log("Error occurred while processing assignment 2 submissions", err);
      // Handle the error here
    }
  }
}
  

  // Calculate averages of the scores 
  const avg = (assignment1Score + assignment2Score) / (assignment1PPoints + assignment2PPoints);
  const assignment1Avg = assignment1Score / assignment1PPoints || 0;
  const assignment2Avg = assignment2PPoints > 0 ? (assignment2Score / assignment2PPoints) : 0; 

  // Assign values to learnerData and use toFixed. for the decimal places
  learnerData.avg = parseFloat(avg.toFixed(3));
  learnerData[1] = parseFloat(assignment1Avg.toFixed(3));
  learnerData[2] = parseFloat(assignment2Avg.toFixed(3));
 

  // Push learnerData to result
  result.push(learnerData);
}
 
  return result;
}
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);


