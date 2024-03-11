const findMatchingCounselor = async (preferredPersonality, expertiseCategory) => {
    // Step 1: Filter all users to create a pool of just those who have "counselor" in their role: array and their isAvailable field set to true.
    const counselors = await User.find({
      role: 'counselor',
      isAvailable: true,
    }).select('userId username expertiseCategory personality');

    // Declare block scoped variable counselorMatch which we are going to be using in steps 2 and 3.
    let counselorMatch;
  
    // Step 2: Filter counselors based on expertiseCategory
    const counselorsWithMatchingExpertise = counselors.filter((user) =>
      user.expertiseCategory.includes(expertiseCategory)
    );

    // If no counselors with matching expertise were found, notify the user and proceed to personality matching
    if (counselorsWithMatchingExpertise.length === 0) {  
      console.log(`Unable to find counselors with expertise in ${expertiseCategory}. Proceeding to personality matching.`);
      // Where there is only one counselor found with matching expertise, return that counselor as the counselorMatch
    } else if (counselorsWithMatchingExpertise.length === 1) {
      counselorMatch = counselorsWithMatchingExpertise[0];
      console.log(`There is only one available counselor with expertise in ${expertiseCategory}: ${counselorMatch.username} (This does not take into account your requested personality preferences)`);
      return counselorMatch;
      // Proceed with counselorsWithMatchingExpertise for further matching in remaining cases where counselorsWithMatchingExpertise.length is greater than one. 
    } else { 
      expertiseMatches = counselorsWithMatchingExpertise;
    }
  
    // Step 3: Personality matching
    // Results of the expertise search may be passed through to personality matching either from the "if" clause or the "else" clause above
    // So the value of expertiseMatches might be an array of multiple elements or an empty array. 
    const matchesByPersonality = [];

    // If there are no counselors available with the expertise the user has requested for the conversation, they will be offered a match based on their personality criteria alone.
    // The only difference between the logic in this if clause and in the else clause is that "counselors" (ie. all users with "counselor" in their role value array and "true" as their isAvailable value setting) is the array on which the logic is run in the if clause. In the else clause it is run on expertiseMatches.
    if (expertiseMatches.length === 0) {
      // Step 3A(1): Develop an array of counselor objects called matchesByPersonality which will hold those counselors whose 5 point personality profile (recorded in the user schema) matched ANY of the elements of the user's inputted preferredPersonality array.
      if(preferredPersonality.every(value => value === null)) {
        // Handle the case where a user indicates no particular personality preference
        console.log('User has indicated they do not require a particular personality in their counselor for this conversation. Proceeding to random selection of a counselor from the pool that are available and have matching expertise.');
                // Proceed with random selection of a counselor from expertiseMatches
                counselorMatch = counselors[Math.floor(Math.random() * counselors.length)];
                console.log(`${counselorMatch.username} has been selected as counselor for this conversation. They ${expertiseCategory} expertise.`);
                return counselorMatch; 
        } else {
        // This for...of loop uses "personalityPreference" as a variable, holding the value of the each individual element of the user-inputted preferredPersonality array. The iteration considers whether this element finds a match with any of the elements in the five element personality array for the counselor, stored in the user schema
        // The loop will continue until it has iterated through all the individual elements in the preferredPersonality array.
        for (const personalityPreference of preferredPersonality) {
            expertiseMatches = expertiseMatches.filter((counselor) =>
              counselor.personality.includes(personalityPreference)
            );
        
            if (matchesForPreference.length === 0) {
                // No matching counselors found for the current personalityPreference element, log the result of that iteration and move to the next
                console.log(`No matching counselors found for ${personalityPreference}.`);
                // But if matches are found for the current personality preference, save the matches for the current personality preference in an array called matchesByPersonality before moving to the next.  We are going to push ALL the matching counselor objects into this array, hoping that some will be repeats, because that means they match more than one of the preferredPersonality criteria. Spread operator pushes in individual objects instead of pushing in an array, which would result in an array of arrays. Flattening the array at this point will make it easier to iterate through in the next step
              } else {  
                matchesByPersonality.push(...matchesForPreference);
            }
    
            // When the whole for...of loop has completed (ie. when every personalityPreference element has had its turn being the entity for which a match is being sought and all counselor profiles that contain a match for ANY element of the preferredPersonality) have been pushed into the matchesByPersonality array, check if only one match exists in the matchesByPersonality array, if so return that value as the counselorMatch.
            if (matchesByPersonality.length === 1) {
                counselorMatch = matchesByPersonality[0];
                console.log(`We found a counselor, who matches some of your requested personality criteria. They also have expertise relevant to this conversation: ${matchesByPersonality[0].username}`);
                return counselorMatch;
          }
        }
    
        // We have allowed the script to end early in a few scenarios handled in the code above:
        // a. if there's only one available counselor matching the expertise requested (a preferred personality may have been requested in this scenario but our matching has not considered personality)
        // b. the major "if" block above deals with a case where the expertise requested by the user cannot be matched in any available counselors. Then a parallel matching by personality logic is applied on the whole counselors array, not just the expertiseMatches array  
        // c. if the user has not requested any particular personality in their counselor and a counselor is available who has their requested expertise
        // d. if there's only one available counselor who matches any of the user's requested personality criteria. The counselor also has expertise relevant for the conversation. 
        // e. This leaves scenarios in which there are more than one counselor objects in the matchesByPersonalityArray. Let's look now for the most recurrences of the same counselor object (that means their personality matches the user's preferences in more than one particular). We will look for the most recurrences first, and decrement each subsequent time the loop is run
        
        // Step 3B(1):
        // Starting with an array of counselor objects called matchesByPersonality which holds those counselors whose 5 point personality profile (recorded in the user schema) matched ANY of the elements of the user's inputted preferredPersonality array, we can look for the most recurrent elements in the array to give us the best match. 
        let mostRepeatedCounselors = [];
        let highestNumRepetitions = 0;

        // Create an object to hold the repetition count fo each personalityMatchedCounselor
        const counselorRepetitionsCount = {};

        // Iterate over each personalityMatchedCounselor in the matchesByPersonality array
          matchesByPersonality.forEach((personalityMatchedCounselor) => {
            //increment the counselorRepetitionsCount for the current personalityMatchedCounselor's userId or initialize it to 1
            counselorRepetitionsCount[personalityMatchedCounselor.userId] = (counselorRepetitionsCount[personalityMatchedCounselor.userId] || 0) + 1;
            
            // Check if the counselorRepetitionsCount is greater than the current highestNumRepetitions
            if (counselorRepetitionsCount[personalityMatchedCounselor.userId] > highestNumRepetitions) {
              // Update highestNumRepetitions
              highestNumRepetitions = counselorRepetitionsCount[personalityMatchedCounselor.userId];

            // Reset mostRepeatedCounselors array with the current personalityMatchedCounselor if this counselor's userId has the highestNumRepetitions 
            mostRepeatedCounselors = [personalityMatchedCounselor];
            // Or if the current personalityMatchedCounselor is tied for highestNumRepetitions, add him/her to the mostRepeatedCounselors array.
          } else if (counselorRepetitionsCount[personalityMatchedCounselor.userId] === highestNumRepetitions) {
            mostRepeatedCounselors.push(personalityMatchedCounselor);
          }
        });

        // Now mostRepeatedCounselors contains all counselors with the most repetitions and we know what the highestNumRepetitions is
        console.log('Most Repeated Counselors:', mostRepeatedCounselors);
        console.log('Highest Number of Repetitions:', highestNumRepetitions);

        if (mostRepeatedCounselors.length === 1) {
          counselorMatch = mostRepeatedCounselors[0];
          if (highestNumRepetitions === preferredPersonality.length) {
            console.log(`${counselorMatch.username} is a counselor who matches exactly the personality you requested in a counselor for this conversation. Unfortunately we were not able to find a match with the particular expertise area, ${expertiseCategory} , that you requested`);
          } else {
            console.log(`${counselorMatch.username} is a counselor who matches more than 1 of the personality qualities you requested in a counselor for this conversation. Unfortunately we were not able to find a match with the particular expertise area, ${expertiseCategory} , that you requested`);
          }
          return counselorMatch; 
        } else {
          counselorMatch = mostRepeatedCounselors[Math.floor(Math.random() * mostRepeatedCounselors.length)];
          if (highestNumRepetitions === preferredPersonality.length) {
            console.log(`${counselorMatch.username} is a counselor who matches exactly the personality you requested in a counselor for this conversation. Unfortunately we were not able to find a match with the particular expertise area, ${expertiseCategory} , that you requested`);
          } else {
            console.log(`${counselorMatch.username} is a counselor who matches more than 1 of the personality qualities you requested in a counselor for this conversation. Unfortunately we were not able to find a match with the particular expertise area, ${expertiseCategory} , that you requested`);
          }
          return counselorMatch;
        }
      // The above steps 3A(1) and 3B(1) have worked through a process for matching by personality for a case where there was not a match between the counselee and counselor in terms of the expertise area requested. 
      // Now we will repeat the same steps 3A(2) and 3B(2) for matching by personality by personality in cases where there was a match between the counselee and counselor in terms of the expertise area requested.
      }
    } else {
      // use filter method to update value of expertiseMatches so it holds only those arrays with length > 0.
      expertiseMatches = expertiseMatches.filter(array => array.length > 0);
      
      // Step 3A: Develop an array of counselor objects called matchesByPersonality which will hold those counselors whose 5 point personality profile (recorded in the user schema) matched ANY of the elements of the user's inputted preferredPersonality array.
      if(preferredPersonality.every(value => value === null)) {
        // Handle the case where a user indicates no particular personality preference
        console.log('User has indicated they do not require a particular personality in their counselor for this conversation. Proceeding to random selection of a counselor from the pool that are available and have matching expertise.');
                // Proceed with random selection of a counselor from expertiseMatches
                counselorMatch = counselors[Math.floor(Math.random() * counselors.length)];
                console.log(`${counselorMatch.username} has been selected as counselor for this conversation. They ${expertiseCategory} expertise.`);
                return counselorMatch; 
        } else {
        // This for...of loop uses "personalityPreference" as a variable, holding the value of the each individual element of the user-inputted preferredPersonality array. The iteration considers whether this element finds a match with any of the elements in the five element personality array for the counselor, stored in the user schema
        // The loop will continue until it has iterated through all the individual elements in the preferredPersonality array.
        for (const personalityPreference of preferredPersonality) {
            expertiseMatches = expertiseMatches.filter((counselor) =>
              counselor.personality.includes(personalityPreference)
            );
        
            if (matchesForPreference.length === 0) {
                // No matching counselors found for the current personalityPreference element, log the result of that iteration and move to the next
                console.log(`No matching counselors found for ${personalityPreference}.`);
                // But if matches are found for the current personality preference, save the matches for the current personality preference in an array called matchesByPersonality before moving to the next.  We are going to push ALL the matching counselor objects into this array, hoping that some will be repeats, because that means they match more than one of the preferredPersonality criteria. Spread operator pushes in individual objects instead of pushing in an array, which would result in an array of arrays. Flattening the array at this point will make it easier to iterate through in the next step
              } else {  
                matchesByPersonality.push(...matchesForPreference);
            }
    
            // When the whole for...of loop has completed (ie. when every personalityPreference element has had its turn being the entity for which a match is being sought and all counselor profiles that contain a match for ANY element of the preferredPersonality) have been pushed into the matchesByPersonality array, check if only one match exists in the matchesByPersonality array, if so return that value as the counselorMatch.
            if (matchesByPersonality.length === 1) {
                counselorMatch = matchesByPersonality[0];
                console.log(`We found a counselor, who matches one of your requested personality criteria. They also have expertise relevant to this conversation: ${matchesByPersonality[0].username}`);
                return counselorMatch;
          }
        }
    
        // We have allowed the script to end early in a few scenarios handled in the code above:
        // a. if there's only one available counselor matching the expertise requested (a preferred personality may have been requested in this scenario but our matching has not considered personality)
        // b. the major "if" block above deals with a case where the expertise requested by the user cannot be matched in any available counselors. Then a parallel matching by personality logic is applied on the whole counselors array, not just the expertiseMatches array  
        // c. if the user has not requested any particular personality in their counselor and a counselor is available who has their requested expertise
        // d. if there's only one available counselor who matches any of the user's requested personality criteria. The counselor also has expertise relevant for the conversation. 
        // e. This leaves scenarios in which there are more than one counselor objects in the matchesByPersonalityArray. Let's look now for the most recurrences of the same counselor object (that means their personality matches the user's preferences in more than one particular). We will look for the most recurrences first, and decrement each subsequent time the loop is run
        
        // Step 3B:
        // Starting with an array of counselor objects called matchesByPersonality which holds those counselors whose 5 point personality profile (recorded in the user schema) matched ANY of the elements of the user's inputted preferredPersonality array, we can look for the most recurrent elements in the array to give us the best match. 
        let mostRepeatedCounselors = [];
        let highestNumRepetitions = 0;

        // Create an object to hold the repetition count fo each personalityMatchedCounselor
        const counselorRepetitionsCount = {};

        // Iterate over each personalityMatchedCounselor in the matchesByPersonality array
          matchesByPersonality.forEach((personalityMatchedCounselor) => {
            //increment the counselorRepetitionsCount for the current personalityMatchedCounselor's userId or initialize it to 1
            counselorRepetitionsCount[personalityMatchedCounselor.userId] = (counselorRepetitionsCount[personalityMatchedCounselor.userId] || 0) + 1;
            
            // Check if the counselorRepetitionsCount is greater than the current highestNumRepetitions
            if (counselorRepetitionsCount[personalityMatchedCounselor.userId] > highestNumRepetitions) {
              // Update highestNumRepetitions
              highestNumRepetitions = counselorRepetitionsCount[personalityMatchedCounselor.userId];

            // Reset mostRepeatedCounselors array with the current personalityMatchedCounselor if this counselor's userId has the highestNumRepetitions 
            mostRepeatedCounselors = [personalityMatchedCounselor];
            // Or if the current personalityMatchedCounselor is tied for highestNumRepetitions, add him/her to the mostRepeatedCounselors array.
          } else if (counselorRepetitionsCount[personalityMatchedCounselor.userId] === highestNumRepetitions) {
            mostRepeatedCounselors.push(personalityMatchedCounselor);
          }
        });

        // Now mostRepeatedCounselors contains all counselors with the most repetitions and we know what the highestNumRepetitions is
        console.log('Most Repeated Counselors:', mostRepeatedCounselors);
        console.log('Highest Number of Repetitions:', highestNumRepetitions);

        if (mostRepeatedCounselors.length === 1) {
          counselorMatch = mostRepeatedCounselors[0];
          if (highestNumRepetitions === preferredPersonality.length) {
            console.log(`${counselorMatch.username} is a counselor with expertise in ${expertiseCategory} who matches exactly the personality you requested in a counselor for this conversation.`);
          } else {
            console.log(`${counselorMatch.username} is a counselor with expertise in ${expertiseCategory} who matches more than 1 of the personality qualities you requested in a counselor for this conversation.`);
          }
          return counselorMatch;
        } else {
          counselorMatch = mostRepeatedCounselors[Math.floor(Math.random() * mostRepeatedCounselors.length)];
          if (highestNumRepetitions === preferredPersonality.length) {
            console.log(`${counselorMatch.username} is a counselor with expertise in ${expertiseCategory} who matches exactly the personality you requested in a counselor for this conversation.`);
          } else {
            console.log(`${counselorMatch.username} is a counselor with expertise in ${expertiseCategory} who matches more than 1 of the personality qualities you requested in a counselor for this conversation.`);
          }
          return counselorMatch;
        }
      }
    }
  };         

