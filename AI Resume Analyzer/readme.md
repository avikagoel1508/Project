1. firstly created app.js , started my express server , required express, mongoose, session, passport , mongo-store 

2. created login signup using local startegy of passport and for frontend used hbs 
3. created auth folder and a file passport.js
4. before this created routes folder and different routes in it 
i. login.js
ii. signup.js
iii. profile.js

5. in app.js written app.use and these paths


6. firstly created signup :
i. two signup routes are there get and post 
-> get to render the signup.hbs page
-> actual logic of signup

ii. in controllers folder created signup.js and written the whole logic
-> first created  a user in models folder , created a schema and exportes the model
->installed bcrypt package using npm documentation to hash the password

->in post signup => 1. first we have taken email and password from req.body
                    2. and then try to find user with the help of email
                    3. if user does not exist then creating the new user and hashing the password
                    4. else user already exists try with another email
                    5. signup done

-> login is handled by passport.js 
1. in routes login.js file we have required passport
2. in controller only get request is there , rest of the logic is in routes only
3. setting up local startegy, google startegy and github strategy in the passport.js
4. using serialize , deserialize function , everything done from the documentation
5. then setting up authentication in routes folder and redirecting to the profile page



7. authentication done 
8. next task was to use multer to upload the pdf

9. MULTER:
a. created middleware folder and a file upload.js
b. in views folder profile.hbs file => we have created a form and action route is /resume/upload 
imp thing was enctype (seen from documentation), type =file , name =resume and an upload button
c. this helped us to create choose file option and upload button on frontend
d. now on backend in app.js i have created a request for /resume , if any request comes starting with /resume it will go to routes mei upload.js ke paas
e. for uploading the pdf main logic was in middleware folder
f. in middleware folder, destination where the pdf should be saved and the name of the pdf everything is mentioned
g. this line is uploading the pdf  router.post('/upload',upload.single('resume'), '    ' )
h. for time being res.send(file uploaded successfully was written in empty space)


10. READING and PARSING THE PDF:
a. after uploading the file main task was to read the file
b. in services parse.js file
c. fs folder was required and with the help of that file was read and we got the data in the form of buffer 
d. installed pdf-parse package and passed the buffer data into it 
e. on printing that data , it gives too many thing like numpages, readpages, text
f. so return data.text (this gives the text part only)

11. INTEGRATING GEMINI:
a. generated gemini api key from google ai studio 
b. from the documentation copied the function
c. this interactions.create function requires gemini model name and input
d.The Gemini SDK sends a request to Google's AI model.

The request contains:
- model name
- prompt/input

The API returns the generated response.
e. entered the input and returned output in json format
f. module.exports = analyzeResume;    (analyzeResume was my fucntion in which logic was written)

12. COMBINING EVERYTHING:
a. everything was combined in controller/resume.js

b.  const parsePDF = require("../services/parse");
const analyzeResume=require('../services/gemini')

module.exports.uploadResume = async(req,res)=>{
    try{
        const text = await parsePDF(req.file.path);
        const analysis = await analyzeResume(text);
        res.json(JSON.parse(analysis));
    }catch(err){
        console.log(err);
        res.status(500).send("Error reading PDF");
    }

}


c. in parsePDF we are  getting that data.text , the parsed text from pdf
d. in analyzeResume we are getting the response of uploaded pdf from gemini
e. now printed the analysis on the frontend
f. imp part is in text variable we have stored the parsed text and passed that text to analyzeResume function when we are calling it , it then directly passes the text to gemini and response is generated.



13. IMPORTANT POINTS: 
a. parsePDF()
Input:
PDF path

Output:
Resume text

b. analyzeResume()
Input:
Resume text

Output:
Gemini analysis