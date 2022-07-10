const setEdit = (id) => {
    // Get information about the note using id
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/note/${id}`, false);
    xhttp.send();

    const myArray = xhttp.responseText.split('"');

    // Filling information about the note in the form inside the modal
    document.getElementById('id').innerHTML = "Note Id: " + id;
    document.getElementById('description').value = myArray[5];

    // Setting up the action url for the note
    document.getElementById('editForm').action = `http://localhost:3000/note/${id}`;
}

const deleteNote = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/note/${id}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadNotes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/notes", false);
    xhttp.send();

    const notes = JSON.parse(xhttp.responseText);

    for (let note of notes) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                    <hr>
                        <div>ID: ${note.id}</div>
                        <div>Note: ${note.description}</div>
                        <div>Created: ${note.createdAt}</div>

                        <button onClick="deleteNote(${note.id})"> Delete </button>
                        <button onClick="setEdit(${note.id})" data-target="#edit"> Edit </button>
                    <hr>
                    </div>
                </div>
            </div>
        `

        document.getElementById('notes').innerHTML = document.getElementById('notes').innerHTML + x;
    }
}

loadNotes();