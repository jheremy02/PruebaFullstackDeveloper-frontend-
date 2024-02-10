export function calculateAge(birthdate) {
    // Convert input string to a Date object
    const birthdateObj = new Date(birthdate);
    
    // Get current date
    const currentDate = new Date();

    // Calculate the difference between current date and birthdate
    const ageMilliseconds = currentDate - birthdateObj;

    // Convert milliseconds to years and months
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const ageYears = Math.floor(ageMilliseconds / millisecondsInYear);
    const ageMonths = Math.floor((ageMilliseconds % millisecondsInYear) / (1000 * 60 * 60 * 24 * 30));
    const result = { years: ageYears, months: ageMonths }

    if (result.years<=0 && result.months<=0) {
        return ''
    } else {
        return  `${result.years} años  ${result.months} meses`;
    }
    
}

export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
  
      reader.onerror = (error) => {
        reject(`Error reading the file: ${error}`);
      };
  
      reader.readAsDataURL(file);
    });
  };

export function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function filterObjectsByAttribute(arrayOfObjects, attributeNames, searchText) {
  // Convert searchText to lowercase for case-insensitive comparison
  const searchTextLowerCase = removeDiacritics(searchText.toLowerCase());

  // Filter the array of objects
  const filteredArray = arrayOfObjects.filter(obj => {
      // Check if any attribute value contains the searchText
      return attributeNames.some(attributeName => {
          const attributeValue = obj[attributeName];
          if (attributeValue !== undefined && attributeValue !== null) {
              // Remove diacritics from attribute value and convert to lowercase
              const attributeValueWithoutDiacritics = removeDiacritics(attributeValue.toString().toLowerCase());
              return attributeValueWithoutDiacritics.includes(searchTextLowerCase);
          }
          return false;
      });
  });

  return filteredArray;
}