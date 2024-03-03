const asyncHandler = require('express-async-handler');
const Person = require('../model/model');
const { assert } = require('console');

//add and save person details
const setPerson = asyncHandler(async (req, res) => {
    try{
    if(!req.body.name && !req.body.age && !req.body.favoriteFoods){
        res.status(404)
        return res.json({ message: 'Invalid'})
    }
    const person = await Person.create({
        name: req.body.name,
        age: req.body.age,
        favoriteFoods: req.body.favoriteFoods
    })
    res.status(200).json(person)
} catch (err) {
    res.status(500).json({message: 'server error'})
}
})

// find all 
const AllPerson = asyncHandler(async(req,res) => {
    try{
        const person = await Person.find()
        if(!person) {
        res.status(404).json({message:"No person found"})
        }
        res.status(200).json(person)

    } catch(err){
        res.status(500).json({message:"Error"})
    }

})

//find person by Id
const getOnePerson = asyncHandler(async (req, res) => {
    try {
    const aPerson = await Person.findById(req.params.id)

    if(!aPerson) {
        res.status(404).json({message: 'person not found'})
     } else {
    res.status(200).json(aPerson)
     }
    } catch(error){
        res.status(500).json({message:'server error'})
    }
})


//findOne person with fav food
// const getOnePersonFood = asyncHandler(async (req, res) => {
//     try {
//         const food = req.params.food; // Assuming food is passed as a route parameter
//         const person = await Person.findOne({ favoriteFoods: food });
//         if (person) {
//             res.status(200).json(person);
//         } else {
//             res.status(404).json({ message: "No person found with the specified food." });
//         }
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

const getOnePersonFood = asyncHandler(async(req,res)=>{
   try{
    // const food = req.params.food
    const person = await Person.findOne({favoriteFoods: {$in:["salad and Jollof Rice"]} })
        if(!person) {
            res.status(404).json({message:"No such person"})
        }
            res.status(200).json(person)

    } catch(error) {
     res.status(500).json({message:'Error'})
   }
})

//Perform Classic Updates by Running Find, Edit, then Save put method
const classicalUpdate = asyncHandler(async(req,res) => {
   try {
         const personId = req.params.personId
         const person = await Person.findById(personId)
             if(!person) {
                 return  res.status(404).json({message:'Error'})
                  }
              person.favoriteFoods.push("hamburgers")
                await person.save()
             res.status(200).json(person)
      } catch (error){
        res.status(500).json({message: 'server error'})
      }
 })

 //Delete One
 const deleteOne = asyncHandler(async(req,res) => {
    const personId = req.params.personId
    const delperson = await Person.findByIdAndDelete(personId)
        if(!delperson) {
            return res.status(404).json({message: "Wrong selection"})
        }
        res.status(200).json({message: "deleted successfully"})
 })

//delete with a specific name
const deleteName = asyncHandler((async(req,res) => {
    const name = req.params.name
     const delperson = await Person.deleteMany({name})
        if(!delperson) {
            return res.status(404).json({message:"no name seleted"})
        }
        res.status(200).json({message:"name deleted"})
}))

//Chain Search Query Helpers to Narrow Search Results
const chainedSearch = asyncHandler(async(req,res)=> {
    try {
    const person = await Person.find({favoriteFoods:"burritos"})
                    .sort({name: 1}).limit(2).select({age:0}).exec()
                     res.status(200).json(person);
    } catch(error){
        res.status(500).json({message:"Server error"})
    }
})

module.exports = { setPerson, getOnePerson, AllPerson, getOnePersonFood, classicalUpdate, deleteOne, deleteName, chainedSearch}