db.enablePersistence()
  .catch((err)=>{
      if(err.code==="unimplemented"){
        console.log('change ur browser u bloody cheap')
      }
      if(err.code==="failed-precondition"){
        console.log('close duplicate tabs u fool')
    }
  })


db.collection('racipe').onSnapshot(snapshot=>{
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change=>{
         console.log(change);
        if(change.type==="added"){
            //data added
            console.log(change.id)
            renderRacipe(change.doc.data(),change.id);
        }
        if(change.type==="removed"){
            //remove data from
        }
    })
})

const form = document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const racipe={
        name : form.title.value,
        ingredients : form.ingredients.value
    };
    db.collection('racipe').add(racipe)
        .catch((err)=>{
            console.group(err);
        })
    form.title.value='';
    form.ingredients.value='';
})

const card=document.querySelector('.recipes');
card.addEventListener('click', e =>{
    console.log(e.target)
})