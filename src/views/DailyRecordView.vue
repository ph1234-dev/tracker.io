<script setup>

import { db } from '@/stores/db.js'
import { ref, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useSession } from '@/stores/session';

let session = useSession()
let data = ref([])

onMounted(async () => {
    let key = session.getRecordOfSelectedDate()
    if (key != undefined) {
        let record = await db.foodRecord.get({ date: key })
        data.value = record.foodTaken
        // session.setFoodTakenRecord(record.foodTaken)
        console.log(`Food taken record : ${JSON.stringify(record)}`)
    } else {
        console.log('data gone after refresh')
    }


})


let removeItem = async (index) => {

    data.value.splice(index,1)

    let date = session.getRecordOfSelectedDate()

    db.foodRecord.where('date').equals(date).modify((item, ref) => {
        item.foodTaken.splice(index, 1)
    })

}

</script>

<template>

    <h1>Daily Record</h1>
    <table>
        <thead>
            <tr>
                <!-- <th v-for="header in headers">
                    <td>{{header }}</td>
                </th> -->
                <th width="30%">
                <td>Food&nbsp;<span class="icon-sort-alpha-asc"></span></td>
                </th>
                <th width="">
                <td>Portion</td>
                </th>
                <th>
                <td>Calories</td>
                </th>
                <th>
                <td>Info</td>
                </th>
                <th width="5%">
                <td></td>
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
</template>

<style scoped>
.icon-bin {
    margin: auto;
}
</style>