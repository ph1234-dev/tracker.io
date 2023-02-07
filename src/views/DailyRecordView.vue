<script setup>

import { db } from '@/stores/db.js'
import { reactive,ref, onMounted, nextTick, getCurrentInstance ,watch} from 'vue'
import { useSession } from '@/stores/session';

let session = useSession()
let data = ref([])

onMounted(async () => {
    let key = session.getRecordOfSelectedDate()
    if (key != undefined) {
        let record = await db.foodRecord.get({ date: key })
        let foodTaken = record.foodTaken
        data.value = foodTaken
        totalFoodTaken.value = foodTaken.length
        
        foodTaken.forEach(item => {
            totalCalories.value = totalCalories.value + item.calories
        });


    } else {
        console.log('data gone after refresh')
    }

})


let removeItem = async (index) => {

    totalCalories.value -= data.value[index].calories
    totalFoodTaken.value -= 1
    data.value.splice(index,1)


    let date = session.getRecordOfSelectedDate()

    await db.foodRecord.where('date').equals(date).modify((item, ref) => {
        item.foodTaken.splice(index, 1)
    })



}

let totalCalories = ref(0)
let totalFoodTaken = ref(0)

// watch(data.value,function(){
//     foodTaken.forEach(item => {
//             totalCalories.value = totalCalories.value + item.calories
//         });
// })

</script>

<template>

    <h3>Daily Record</h3>
    <span class="actionbar text-small">
        <span class="actionbar-info"><strong>Total Calories</strong>{{totalCalories}} cal</span>
        <span class="actionbar-info"><strong>Items</strong> {{totalFoodTaken}} </span>
        <router-link class="actionbar-action" :to="{name: 'store_food'}">
            <i class="icon-plus"></i><strong>ADD MORE</strong> 
        </router-link>
    </span>
    <table v-if="totalFoodTaken" class="">
        <thead>
            <tr>
                <th width="30%">
                    <td><strong>Portion</strong></td>
                </th>
                <th width="">
                    <td>Portion</td>
                </th>
                <th>
                    <td>Calories</td>
                </th>
                <th>
                    <td>Details</td>
                </th>
                <th width="5%">
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(val, index) in data">
                <td>{{ val.food }}</td>
                <td>{{ val.portion }}</td>
                <td>{{ val.calories }}</td>
                <td>{{ val.additionalInfo }}</td>
                <td class="option" style="">
                    <span class="icon-bin" @click.stop="removeItem(index)"></span>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else class="panel panel-vertical">
        <span class="text text-big text-bold">No Record</span>
        <p>It seems that there is no record found.</p>
    </div>
</template>

<style scoped>
.icon-bin {
    margin: auto;
}

p{
    max-width: 45ch;
}
</style>