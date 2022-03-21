let startMachine=()=>{
    return new Promise((resolve,reject)=>{
        console.log('Works in 3 second');
        setTimeout(()=>{
            console.log('Start');
            resolve();
        },3000);
    });
};

async function test(){
    console.log('A');
    console.log('B');
    console.log('C');
    await startMachine();
    console.log('D');
    console.log('E');
}

test();