export function getCurrentTime() {
    return Math.floor(Date.now() / 1000);
}

export function returnRandomSearchQuery() {
    const list = ['vegan', 'pasta', 'rice', 'salad', 'chicken', 'italian', 'fish', 'soup', 'cheese', 'chinese']
    const number = Math.floor(Math.random() * 8);
    return list[number];
}