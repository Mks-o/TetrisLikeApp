class Random{
    getRandomNumber(min, max){
        return Math.trunc(Math.random()*(max-min+1) + min);
    }
    getRandomArrayElement(arr){
        return arr[this.getRandomNumber(0, arr.length - 1)];
    }
}