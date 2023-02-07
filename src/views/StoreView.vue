<script setup>
import { db } from "@/stores/db.js"
import { ref, toRaw, reactive,watchEffect } from "vue"
import { useSession } from "@/stores/session"
import { useRouter } from "vue-router";
import {useFormValidator} from '@/api/validator'
// let {food,calories,portion,info} = ref()
// let food = ref()
// let calories = ref()
// let portion = ref()
// let info = ref()

let recordToday = ref([])
let router = useRouter()
let session = useSession()

const initialFormContent = {
    food: "",
    calories: "",
    portion: "",
    info: ""
}

const form = reactive(initialFormContent)

// tutorial for validation
// https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/
const { validateEmptyField, validateRangeValue, formErrors } = useFormValidator();

const validateInput = () => {
    // let x = validateNameField
    validateEmptyField("item", form.food,"Food name is required");
    // validateEmptyField("calories",form.calories,"Calorie estimate is required");
    validateEmptyField("portion", form.portion,"Portion estimate is required");
    validateRangeValue("calories",parseInt(form.calories),0,10000)
};

let saveToIndexDB = async () => {

    let currentDateKey = session.getRecordOfSelectedDate()
    let currentRecordFromDB = await db.foodRecord.get({ date: currentDateKey })

    // for deep copying of array (call by value instead of call by reference) 
    // in vue... use to raw and then use structuredClone
    // https://stackoverflow.com/questions/66071399/why-is-torawobj-maintaining-reactivity
    // https://stackoverflow.com/questions/72632173/unable-to-use-structuredclone-on-value-of-ref-variable
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone

    const payload = structuredClone(toRaw(recordToday.value));
    if (currentRecordFromDB == undefined) {
        console.log("Bulk adding ")

        // first time addition
        await db.foodRecord.bulkAdd([{date: currentDateKey,foodTaken: payload}])
            .then(result => { console.log(`Added new record`)})
            .catch(err => { })
        router.push({
            name: 'daily_actual_record'
        })

    } else {
        // adding to nested object in dexie
        // https://stackoverflow.com/questions/44907820/dexie-how-to-add-to-array-in-nested-object
        await db.foodRecord.where('date').equals(currentDateKey).modify(rec => {
            rec.foodTaken.push(...payload)
        }).then(success => {
            router.push({
                name: 'daily_actual_record'
            })
        }).catch(err => { console.error(err) })
    }

}

let addToList = async () => {

    let validatePromise = new Promise((resolve,reject)=>{
        validateInput()
        resolve(Object.keys(formErrors).length > 0)
    }).then((value)=>{

        console.log(`Number of errors: ${value}`)
        if ( value ){
            console.log(`<< Errors found in form`)
            // console.log(`Form Errors >> ${value}`)

        }else{
            console.log(`<< no Errors found in form`)

            console.log('Object Key')
            let data = {
                "food": form.food,
                "calories": form.calories,
                "portion": form.portion,
                "info": form.info
            }

            recordToday.value.push(data)
            // reset the value of form (reative variable) back
            // to its original value which is initialformcontent
            // see documentaiton here
            // https://stackoverflow.com/questions/68312516/how-to-reset-all-values-to-initial-state-in-vue3
            // https://stackoverflow.com/questions/61184749/how-to-properly-reset-vue-composition-apis-reactive-values
            // Object.assign(form,initialFormContent)
            form.food = null
            form.calories = null
            form.portion = null
            form.info = null   

        }
    })

    await validatePromise
   


}

let deleteItem = (index) => {
    recordToday.value.splice(index, 1)
}


</script>

<template>

    <div class="container container-split-2 util-paddingless">
        <!-- 
            read this to prevent default of form calling method=get
            we cna stop it and call a function instead 
           https://softauthor.com/vuejs-prevent-form-submission/
         -->

        <form class="form" @submit.prevent="addToList()">
            <span class="text text-big">General Info</span>
            <p class="text-small">
                Write the information of the food you ate
                to add them on the list
            </p>
            <label>Food Name</label>
            <input v-model="form.food" type="text" />
            <span v-if="formErrors.item" class="error">{{ formErrors.item }}</span>

            <label>Calories</label>
            <input v-model="form.calories" type="number"    />
            <span v-if="formErrors.calories" class="error">{{ formErrors.calories }}</span>

            <label>Portion</label>
            <input v-model="form.portion" type="text" />
            <span v-if="formErrors.portion" class="error">{{ formErrors.portion }}</span>

            <label>Additional Info</label>
            <textarea v-model="form.info"></textarea>

            <input type="submit" value="Add to List" />

        </form>

        <div class="panel panel-vertical" id="record">
            <span class="text text-big">Record</span>
            <template v-if="recordToday.length > 0">
                <p class="text-small">
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
                        <tr v-for="(item, index) in recordToday">
                            <td>{{ item.food }}</td>
                            <td>{{ item.calories }}</td>
                            <td>{{ item.portion }}</td>
                            <td>
                                <span @click.stop="deleteItem(index)" class="icon-bin"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn" @click.stop="saveToIndexDB">Save</button>
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

.actionbar {
    width: 100%;
}
</style>