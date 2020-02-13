# characterSearch
Home Task 2: 
Create a console application CharacterSearch. The application should be able to do the following: 
1) Download a Database of characters from the Rick and Morty API.
2) Perform search of a character based on the search parameters passed in the command line. List of parameters to be used for search: name, id, status, species, gender. When provided with multiple search parameters the application should print out all the results that match all the provided search parameters.
3) On each search the application should request the entire database of characters, then perform a search in it, and after that it should print out number of matches and the first five results of search in the console and then record all of the results in a json file “results.json”.
4) If no characters matching the search parameters are found the application should print out an error message.

Command example: npm run search -- --name “Toxic Rick” --status “Dead” --species “Humanoid” –gender “Male”

Useful links: 
1.	Yargs - A package for creating console applications. Good for creating commands and for parsing arguments. 
2.	fs.writeFileSync – for writing files. 
3.	JSON.stringify – for converting an object to string. 
4.	Array.push , Array.Filter , Array.forEach – methods for working with arrays that might help you.  
5.	Axios, got, node-fetch – some package for making requests that use promises.
