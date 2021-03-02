db.collection('racipe').onSnapshot(snapshot=>{
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change=>{
        //  console.log(change,change.type,change.doc.data());
        if(change.type==="added"){
            //data added
            renderRacipe(change.doc.data(),change.id);
        }
        if(change.type==="removed"){
            // remove data from
        }
    })
})