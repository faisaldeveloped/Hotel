function createCard(roomObject)
{
    return `
            <div class="card col" onclick="bookRoom('${roomObject.id}')">
            <span class="head"><p> Room number: #${roomObject.roomNumber} </p></span>
            <span class="pargraph"><p> Floor number: ${roomObject.floorNumber} </p></span>
            <span class="pargraph"><p> Beds: ${roomObject.bedNumber} </p></span>
            <span class="pargraph price"><p> Price: ${roomObject.price} SAR </p></span>
            <p>
            ${roomObject.desc}
            </p>
            <button class="btn">Book Now</button>
            </div>
            `
}

async function hasRoom()
{
    const uid = auth.currentUser?.uid;

    if(!uid)
    {
        return false;
    }
    else
    {
        return await roomsCollection.get().then(async snapshot =>{
            let hasBooking = false;
            for(let i = 0; i < snapshot.docs.length; i++)
            {
                const doc = snapshot.docs[i];
                const data = doc.data();
                hasBooking = data.user?.id === uid;
                if(hasBooking)break
            }
            return hasBooking;
        });
    }
}

async function bookRoom(roomId)
{
    const uid = auth.currentUser?.uid;

    if(!uid)
    {
        alert("You must login");
    }
    else
    {
        if(await hasRoom(roomId))
        {
            alert("You already have a room");
        }
        else
        {
        await roomsCollection.doc(roomId).update({
           user: userCollection.doc(uid)
        });
        
        localStorage.setItem("currentRoomId", roomId);
        window.location.href = "/current-room.html";
        }
    
        //await refrechRooms();
    }
}

async function getRooms()
{
    let rooms = [];
    await roomsCollection.get().then(async snapshot =>{
        for(let i = 0; i < snapshot.docs.length; i++)
        {
            const doc = snapshot.docs[i];
            const data = await doc.data();
            if (!data.user)
            {
                data.user = (await data.user?.get())?.data()
                const docData = {
                    id: doc.id,
                    ...data,
                }
                rooms.push(docData);
            }
        }
    });

    return rooms;
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