/**
 * @description: 查找数组元素位置

找出元素item在给定数组arr中的位置 描述：如果数组中存在item就返回元素在数组中的位置，否则就会返回-1 [1,2,3,4,5,6] --> 存在3就输出2，存在7输出-1 
 * @author: PresByter
 * @date   : 2021/03/04 09:37:39
 * @latest : 2021/03/04 09:37:39
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 */
function indexOf(arr: number[] = [], item: number) {
    //TODO
    let finalIndex: number = -1
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            finalIndex = i
            break
        }
    }
    return finalIndex
}
console.log(indexOf([1, 2, 3, 4, 5, 6], 3));
console.log(indexOf([1, 2, 3, 4, 5, 6], 7));
