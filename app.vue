<script lang="ts" setup>
import type { IUserData } from './utils/types/User'

const store = useUserStore()
const { user } = storeToRefs(store)

async function getUser() {
    const { data, success } = await $fetch<IUserData>('/api/user', { method: 'GET' })
    // if successful, update user state object
    if (success) user.value = data
}

onMounted(() => getUser())

// function minimumVisionValue(number: number) {
//     const result = []
//     let min
//     // convert numbers to array
//     const numsArr = String(number)
//         .split('')
//         .map((num) => parseInt(num))

//     // console.log('Heloo', numsArr)
//     for (let i = 0; i < numsArr.length; i++) {
//         let leftSum = 0
//         let rightSum = 0
//         console.log('Current', numsArr[i]) // 2

//         // left side
//         for (let j = i - 1; j >= 0; j--) {
//             // console.log('left: ', numsArr[j])
//             leftSum += numsArr[j]
//         }

//         // right side
//         for (let j = i + 1; j < numsArr.length; j++) {
//             // console.log('right: ', numsArr[j])
//             rightSum += numsArr[j]
//         }

//         // console.log('Right ', rightSum)
//         console.log('results ', result)
//         result.push(leftSum + rightSum)
//     }

//     // get the smallest value
//     for (let x = 0; x < result.length; x++) {
//         min = result[0]
//         if (result[x] < min) {
//             min = result[x]
//         }
//     }

//     console.log('The minimum visible vision value: ', min)
//     return min
// }
// const data = 2345
// minimumVisionValue(data)
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
