// CRUD
// Create Read Update Delete Search




//Read  -------> from local storage
let addNotesContainer= document.getElementById('addNoteContainer') // this is initialization of hiding line
function showAllNotes(){
addNotesContainer.style.display='none'; /// this line about to hide the editadle space(title, descp)
    let allNotes;
    let notes=localStorage.getItem("notes")
    if(notes===null){
        allNotes= []
    }else{
        allNotes=JSON.parse(notes);// getting notes from local storage
    }

    let notesContainer= document.getElementById('notes');
    notesContainer.innerHTML='';   //
    allNotes.forEach((note,index)=> {
        
        notestoBeshown =`<div class="card" style="width: 18rem;">   
                            <div class="card-body">
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text">${note.descp}</p>
                                <button class="btn btn-light card_btns" onclick="deleteNote(${index})"><img src="./delete.svg" alt="" class="delete_btn"></button>
                                <button class="btn btn-light  card_btns" onclick="editNote(${index})"><img src="./edit.svg" alt="" class="edit_btn"></button>
                            </div>
                        </div>`       //  in this foreach loop ecah item will overrdie other 
                                      //  so, we have save every item
        notesContainer.innerHTML=  notesContainer.innerHTML+notestoBeshown // from this line  it will save each item 
    });
   


}
showAllNotes()


/// Add Note Btn 





let addNoteBtn =document.getElementById('addNote')
addNoteBtn.addEventListener('click', ()=>{
    let allNotes;
    let notes=localStorage.getItem("notes")
    if(notes===null){
        allNotes= []
    }else{
        allNotes=JSON.parse(notes);// getting notes from local storage
    }
    let title=document.getElementById('title');
    let descp=document.getElementById('descp');

    let newnoteObj ={
        title: title.value,
        descp:descp.value
    }
    if(addNoteBtn.innerText=="Update Note"){
        let editCard=document.querySelector('.card')
        let editIndex=editCard.getAttribute('editIndex')
        allNotes[editIndex]=newnoteObj
    }else{
        allNotes.push(newnoteObj);/// add new object(title, descp  as newnoteobj)  at last 
    }
    
    localStorage.setItem("notes", JSON.stringify(allNotes)) /// converted to string and set in localStorage
    title.value=''
    descp.value=''
    showAllNotes()           /// and to show object     
})

let navAddNoteBtn =document.getElementById('navAddNote')

navAddNoteBtn.addEventListener('click', function() {
    addNotesContainer.style.display='block';
    addNoteBtn.innerText='Save'
})

/// delete the note
function deleteNote(noteIndex){
    let allNotes=JSON.parse(localStorage.getItem('notes'));
    allNotes.splice(noteIndex, 1)/// it will start deleting from 0 throw noteindex until 1 
    localStorage.setItem("notes", JSON.stringify(allNotes));
    showAllNotes()
}

//edit note
function editNote(noteIndex){
    let allNotes=JSON.parse(localStorage.getItem('notes'));
    addNotesContainer.style.display='block';
    addNoteBtn.innerText='Update Note'

    let title=document.getElementById('title');
    let descp=document.getElementById('descp');

    title.value=allNotes[noteIndex].title
    descp.value=allNotes[noteIndex].descp

    let editCard=document.querySelector('.card')
    editCard.setAttribute('editIndex', `${noteIndex}`)

}

let search = document.getElementById('search')
search.addEventListener('input', ()=> {
    let inputValue = search.value.toLowerCase()
    let allCards = document.getElementsByClassName('card');

    Array.from(allCards).forEach((ele)=>{
        let cardText = ele.getElementsByTagName('p')[0].innerText

        if(cardText.toLowerCase().includes(inputValue)){
            ele.style.display = 'block';
        }
        else{
            ele.style.display ='none';
        }
    })
})