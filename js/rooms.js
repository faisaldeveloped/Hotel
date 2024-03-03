function createCard(roomObject)
{
    return `
            <div class="room-card row row-center">
            <h4>${roomObject.roomNumber} :</h4>
            <span class="cell">${roomObject.floorNumber}</span>
            <span class="cell">${roomObject.bedNumber}</span>
            <span class="cell">${roomObject.price}</span>
            <span class="cell">${roomObject.user?.fullName ?? 'not-booked'}</span>
            <span>
                <button onclick="freeUpRoom('${roomObject.id}')" class="btn btn-outline">Free Up</button>
                <button onclick="deleteRoom('${roomObject.id}')" class="btn">Delete</button>
            </span>
        </div>
            `
}

async function getRooms()
{
    let rooms = [];
    await roomsCollection.get().then(async snapshot =>{
        for(let i = 0; i < snapshot.docs.length; i++)
        {
            const doc = snapshot.docs[i];
            const data = await doc.data();
            data.user = (await data.user?.get())?.data()
            const docData = {
                id: doc.id,
                ...data,
            }
            rooms.push(docData);
        }
    });

    return rooms;
}

async function deleteRoom(roomId)
{
    await roomsCollection.doc(roomId).delete();
    await refrechRooms();
}

async function freeUpRoom(roomId)
{
    await roomsCollection.doc(roomId).update({
        user: null
    });

    await refrechRooms();
}

async function refrechRooms()
{
    const rooms = await getRooms();
    const roomsContainer = document.getElementById("rooms-container");

    roomsContainer.innerHTML = 'No Rooms Yet..';

    if(rooms.length > 0)
    {
        roomsContainer.innerHTML = rooms.map(createCard).join(' ');
    }
}

(async () =>{
    await refrechRooms();
})()