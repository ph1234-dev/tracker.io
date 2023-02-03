<script setup>
import { db } from "@/stores/db.js"
import { ref , toRaw } from "vue"
import { useSession } from "@/stores/session"

// let {food,calories,portion,info} = ref()
let food = ref()
let calories = ref()
let portion = ref()
let info = ref()

let session = useSession()

let saveToIndexDB = async () => {

    let currentDateKey = session.getRecordOfSelectedDate()
    let currentRecordFromDB = await db.foodRecord.get({date: currentDateKey})

    // for deep copying of array (call by value instead of call by reference) 
    // in vue... use to raw and then use structuredClone
    // https://stackoverflow.com/questions/66071399/why-is-torawobj-maintaining-reactivity
    // https://stackoverflow.com/questions/72632173/unable-to-use-structuredclone-on-value-of-ref-variable
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone

    const payload = structuredClone(toRaw(recordToday.value));
    if (currentRecordFromDB == undefined) {
        console.log("Bulk adding ")

        // first time addition
        await db.foodRecord.bulkAdd([{
            date: currentDateKey,
            foodTaken: payload
        }]).then(result=>{
            console.log(`Added new record`)
        }).catch(err=>{

        })
        
    } else {
        // adding to nested object in dexie
        // https://stackoverflow.com/questions/44907820/dexie-how-to-add-to-array-in-nested-object
        db.foodRecord.where('date').equals(currentDateKey).modify(rec=>{
            rec.foodTaken.push(...payload)
        })
    }

}

let addToList = ()=>{
    let data = {
        "food": food.value,
        "calories": calories.value,
        "portion": portion.value,
        "info": info.value
    }

    recordToday.value.push(data)
}

let deleteItem = (index) => {
    recordToday.value.splice(index, 1)
}

let recordToday = ref([])

</script>

<template>

    <div class="container container-split-2 util-paddingless">

        <div class="form ">
            <span class="text text-big">General Info</span>
            <p class="text text-small">
                Write the information of the food you ate
                to add them on the list
            </p>
            <label>Food Name</label>
            <input v-model="food" type="text" />

            <label>Calories</label>
            <input v-model="calories" type="number" />

            <label>Portion</label>
            <input v-model="portion" type="text" />

            <label>Additional Info</label>
            <textarea v-model="info"></textarea>

            <button class="btn-primary" @click="addToList">
                Add
            </button>

        </div>

        <div  class="panel panel-vertical" id="record">
            <span class="text text-big">Record</span>
            <template v-if="recordToday.length > 0">
                <p class="text text-small"> 
                    The list of you you added
                </p>
                
                <table style="width: 100%" class="text text-small">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Calories</th>
                            <th>Portion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in recordToday">
                            <td>{{ item.food }}</td>
                            <td>{{ item.calories }}</td>
                            <td>{{ item.portion }}</td>
                            <td>
                                <span @click.stop="deleteItem(index)" class="icon-bin"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn" @click.stop="saveToIndexDB" >Save</button>
            </template>
            <template v-else>
                <p class="text"> 
                    You have not added anything yet
                </p>
            </template>
        </div>
    </div>

</template>

<style scoped lang="scss">
// #record{
//     background-color: green;
// }

.actionbar{
    width: 100%;
}
</style>