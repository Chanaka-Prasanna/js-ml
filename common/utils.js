const utils = {};

utils.flaggedUsers = [1663882102141,1663900040545,1664485938220]

utils.formatPercent = (n)=>{
    return (n*100).toFixed(2)+"%";
}
utils.printProgress = (count,max)=>{
    // erases any previously written content on that line
    process.stdout.clearLine();
    //  it sets the cursor's horizontal position to the beginning of the line (column 0)
    process.stdout.cursorTo(0);

    const percent = utils.formatPercent(
        count/max
    );

    process.stdout.write(count+'/'+max+" ("+percent+ ")")
}

// key is studentId here
utils.groupBy= (objArray,key)=>{
    const groups = {};
    for(let obj of objArray){
        const val = obj[key];
        if(groups[val]==null){
            groups[val] = [];
        }
        groups[val].push(obj);
    }

    return groups;
}

if(typeof module !== undefined){
    module.exports = utils;
}