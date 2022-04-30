an ETL server to allow hospitals send patients and their treatments info into our unified DB

to try it:
1. npm run start
2. post the POST request written below (or import TailorMed.postman_collection.json to PostMan, and run the request there)


request: POST http://localhost:4000/v1/PatientsTreatment
body:
{
    "hospitalId": 2,
    "patients": {"url": "MockDB/2_patient.csv"},
     "treatments": {"url": "MockDB/2_treatment.csv"}
}

Imortant: currently server is working with a mock DB (I ran out of time), and there's some bug when converting dates to a unified format

What could be improved in my solution of this task:
1. converting data to our format is done by code (utils/convertor.js). it's a disadvantage, as new convertors will require deploying the server (instead of just updating the DB).
2. a logic is needed to make sure a patient is 100% identified (not to have duplication of same patient). Since we don't always have ID, we can combine name & lastname & DOB.
3. a logic to make sure treatment is not already transformed into our DB (by checking hospitalId+src_treatmentId)
4. a logic to prevent abuse by sending same data again and again (i.e even if we guard from duplication - the time to process it again and again will cost us unnecesssarily)

I also left on purpose some TODOs, where instructions weren't full

