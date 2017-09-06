//Split data string by new line and ',' into array of arrays 
parseData = (data) => data.split(/\r?\n/).map(x => x.split(','))

//Algo to merge contacts
mergeContacts = (dataSet) => {

    /* Constant representing the index of Name */
    const NAME_INDEX = 0;

    /* Constant representing the index of Contact */
    const CONTACT_NO_INDEX = 1;

    /* An array which needs to be compared with the all elements of data set for each iteration of master loop  */
    var compareSet = [];

    /* Array containing the master result set  */
    var resultSet = [];

    /*Master Loop, which will run until there is any element in the dataSet */
    while (dataSet.length) {
        /* Remove the first element from the dataSet, here dataSet array exhibit the bejaviour of a queue */
        /* Insert the data set element removed into compare set. */
        /* This is done because this is the element which needs to be compared to the data set to find the
         matching elements, Also this makes it the first element of the compare set  */
        compareSet.push(dataSet.shift());

        /* Comparison loop */
        /* This loop runs for the length of data set and compares each element of data set with all the
         elements of compare set. If an element is found related , that element is deleted from the data set
         and inserted into compare set . After that the loop restarts with the new data set. This continues
         until there are no more elements in the data set or there are no matches in the data set and compare set  */
        for (var index = 0; index < dataSet.length; index++) {
           
            /* Compare Set Loop */
            /* compare set loop iterates over the compare set elements to match them with the current iteration 
            data set element of comparison loop */
            for (var i = 0; i < compareSet.length; i++) {
                /* Check if name or contact number matches */
                if (compareSet[i][NAME_INDEX] == dataSet[index][NAME_INDEX] ||
                    compareSet[i][CONTACT_NO_INDEX] == dataSet[index][CONTACT_NO_INDEX]) {
                  
                    /* Push matched data set element to compares set */
                    compareSet.push(dataSet[index]);

                    /* Remove the matched element */
                    dataSet.splice(index, 1);

                    /* Restart the comparison loop */
                    index = -1;

                    /* brake the compare loop as we have to restart the comparison loop */
                    break;
                }
            }
        }

        /* Push the compare set to result set as a single merged contact */
        resultSet.push(compareSet);

        /* Sanitize the compare set by emptying it */
        compareSet = [];
    }
    /* Return the master result set containing all merged contacts  */
    return resultSet;
}

//Parse fileData string and run algorithm on the data
processData = (fileData) => {
    var content = parseData(fileData);
    console.log('Found​ ' + content.length + '​ ​contacts');
    return mergeContacts(content);
}

module.exports.processData = processData;