export function getCurrentTime() {
    return Math.floor(Date.now() / 1000);
}

export function returnRandomSearchQuery() {
    const list = ['vegan', 'pasta', 'rice', 'salad', 'chicken', 'italian', 'fish', 'soup', 'cheese', 'chinese', 'Comfort food', 'Quick and easy meals', 'Dessert', 'Vegetarian', 'Slow cooker', 'Chicken']
    const number = Math.floor(Math.random() * 15);
    return list[number];
}