import Dexie from 'dexie'

export let db = new Dexie("fitness");
db.version(1).stores({
    foodRecord: "&date" 
});

db.open().catch(function (e) {
    console.error("Open failed: " + e.stack);
})
// db.foodRecord.put({
//     date: new Date().toLocaleDateString(),
//     foodTaken: [
//         {
//             "food": "potato",
//             "calories": 210,
//             "portion": "50grams"
//         },
//         {
//             "food": "noodles",
//             "calories": 350,
//             "portion": "1pack"
//         },
//     ],
//   });

// alert(db.foodRecord.get(new Date().toLocaleDateString()))

// let data = await db.foodRecord.get({date: new Date().toLocaleDateString()})
// let data = await db.foodRecord.get({date: 1})
// console.log(data)

// let newFoodTaken = data.foodTaken
// console.log(newFoodTaken)

// newFoodTaken.push({
//     "food": "zcrackers",
//     "calories": 100,
//     "portion": "1pack"
// })

// db.foodRecord.update({date: new Date().toLocaleDateString()}, {
//     "foodTaken": newFoodTaken
// })
