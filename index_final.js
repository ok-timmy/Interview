const findCombinationsFromText = (textCombination) => {
  const arrayOfKeyWord = [
    "Group",
    "Category",
    "Subcategory",
    "Make",
    "Model",
    "Diagram",
  ];

  let returnedArray = [];

  // Uses the array of keywords to check if the
  const returnedArrayFromMap = (str, keywords) => {
    const result = [];
    let currentSubstring = str;

    for (let i = 0; i < keywords.length - 1; i++) {
      const keyword = keywords[i];
      const nextKeyword = keywords[i + 1];
      const index = currentSubstring.indexOf(keyword);

      if (index !== -1) {
        const substring = currentSubstring.slice(0, index);
        result.push(`${substring}`);
        currentSubstring = currentSubstring.slice(index);
      }
    }

    // Add the remaining substring after the last keyword
    if (currentSubstring.length > 0) {
      result.push(currentSubstring);
    }
    result.shift();

    console.log(result);
    return result;
  };

  // Remove characters between the string
  const removeCharactersAndAvoidConsecutiveSeparators = (str, characters) => {
    const separator = " ";

    // Create a regular expression pattern to match consecutive separators
    const separatorPattern = new RegExp(`${separator}{2,}`, "g");

    // Remove the specified characters from the string
    let result = str.replace(new RegExp(`[${characters}]`, "g"), "");

    // Remove consecutive separators
    result = result.replace(separatorPattern, separator);

    return result;
  };

  // Check if there are duplicate words(found in the array of keywords) in the array of searched Keywords
  const checkIfThereAreDuplicateValues = (wordsArray, comparisonArray) => {
    const wordCounts = {};

    // Count the occurrences of words in comparisonArray
    for (let i = 0; i < comparisonArray.length; i++) {
      const word = comparisonArray[i];
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    // Check if any word in wordsArray appears more than once in comparisonArray
    for (let i = 0; i < wordsArray.length; i++) {
      const word = wordsArray[i];
      if (wordCounts[word] && wordCounts[word] > 1) {
        return false; // Word appears more than once in comparisonArray
      }
    }

    return true; // All words appear at most once in comparisonArray
  };

  // Reorder array by the order by which they should appear
  const reorderArrayByWordsOrder = (array, orderWords) => {
    const wordsMap = new Map();
    const remaining = [];

    // Group words in the array into two categories: ordered and remaining
    for (let i = 0; i < array.length; i++) {
      const word = array[i];
      if (orderWords.includes(word)) {
        if (!wordsMap.has(word)) {
          wordsMap.set(word, []);
        }
        wordsMap.get(word).push(word);
      } else {
        remaining.push(word);
      }
    }

    // Construct the reordered array
    const reorderedArray = [];

    // Add the ordered words in the specified order
    for (let i = 0; i < orderWords.length; i++) {
      const orderedWords = wordsMap.get(orderWords[i]);
      if (orderedWords) {
        reorderedArray.push(...orderedWords);
      }
    }

    // Add the remaining words to the end of the reordered array
    reorderedArray.push(...remaining);

    return reorderedArray;
  };

  // Push list of arrays here
  const generateSuccessiveArrays = (originalArray) => {
    const result = [];

    for (let i = originalArray.length - 1; i > 0; i--) {
      if (i !== 0) {
        const successiveArray = originalArray.slice(i - 1);
        successiveArray.pop();
        result.push(successiveArray);
      }
    }

    return result;
  };

  //If there are duplicates, return nothing
  if (checkIfThereAreDuplicateValues(arrayOfKeyWord, returnedArrayFromMap)) {
    return [];
  }

  //Else if there are no duplicates
  else {
    // remove unnessary characters
    const unnessaryCharactersRemoved = returnedArray.map((x) => {
      return removeCharactersAndAvoidConsecutiveSeparators(
        x,
        "!, -, --, ' ', %, &, |, #"
      );
    });

    //   reorder the items in the array
    const returnedArray2 = reorderArrayByWordsOrder(
      unnessaryCharactersRemoved,
      arrayOfKeyWord
    );

    //generate the successive arrays
    const finalResult = generateSuccessiveArrays(returnedArray2);

    return finalResult;
  }
};
