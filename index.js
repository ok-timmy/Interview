// keywords  group, category, subcategory, make model diagram

const findCombinationsFromText = (textCombination) => {
  const arrayOfKeyWord = [
    "Group",
    "Category",
    "Subcategory",
    "Make",
    "Model",
    "Diagram",
  ];
  // Check if word contains the keywords
  let listOfFoundKeyword = [];
  let returnedKeywordAndPair = [];
  let returnedArray = [];

  const returnedArrayFromMap = arrayOfKeyWord.map((x) => {
    if (textCombination.includes(x)) {
      listOfFoundKeyword.push(x);
    }
    return listOfFoundKeyword;
  });

  const checkIfThereAreDuplicateValues = (myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      for (var j = 0; j < myArray.length; j++) {
        if (i != j) {
          if (myArray[i] == myArray[j]) {
            return true; // means there are duplicate values
          }
        }
      }
    }
    return false; // means there are no duplicate values.
  };

  //If there are duplicates, return nothing
  if (checkIfThereAreDuplicateValues(returnedArrayFromMap)) {
    returnedArray = [];
    return returnedArray;
  }

  //Else we check if there are no duplicates
  else {
    const xy = arrayOfKeyWord.map((x) => {
      const array = textCombination.split(x);
      return array;
    });

    const xyReordered = (xy) => {
      let reordered = [];
// reorder array here
      return reordered;
    };

    // Push list of arrays here
    const poppedAndReorederedArray = (xyReordered) => {
      returnedArray.push(xyReordered);
      const newXyReordered = xyReordered.pop();
      for (i = 0; i < newXyReordered.length; i++) {
        returnedArray.push(newXyReordered.pop());
      }
      return returnedArray
    };

    console.log(poppedAndReorederedArray);
    returnedArray = poppedAndReorederedArray;
  }

 
 {
  }
};
