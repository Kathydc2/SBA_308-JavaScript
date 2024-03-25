SBA 308 Javascript

Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

I created the function and separated it into a few sections.

I started with a try throw catch error if the assignmentgroup and courseinfo dont match. 

The loop is to filter the learner ids 125 and 132. Pushing the ids in the helper function "learnerData" to catch all necessary info
I created a courseinfo needed section with variable to reference the scores for both 1 & 2 and the possible points for both and the late penalty. 

Assignment 1 and 2 is two separate loops. In assignment 1 loop I added a control keyword continue. 
Assignment 2 loop is calculating assignments that are due and deduct 10% for the late penalty for both learners. I also added a try catch error in case the points equal zero.

Following that I did the calculations of the averages for each learner. I made sure to fix the decimal places using toFixed and adding the data into learnerdata.
All data from the "learnerData" is then pushed into result. It outputs id:125,132 , avg of both assignments and scores for 1 and 2 .
