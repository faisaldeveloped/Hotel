async function getCurrentRoom()
{
    const roomId = localStorage.getItem('currentRoomId');
    if(!roomId)
    {
        window.location.href = "/book.html";
    }

    const room = await roomsCollection.doc(roomId).get();
    return {id: roomId, ...room.data()};
}

async function checkout()
{
    const roomId = localStorage.getItem('currentRoomId');
    await roomsCollection.doc(roomId).update({
        user: null
    });
    localStorage.removeItem('currentRoomId');
    window.location.href = '/checkout-room.html';
}

(async () =>{
    const room = await getCurrentRoom();
    document.getElementById('roomNumber').innerHTML = `Room: #${room.roomNumber}`;
    document.getElementById('floorNumber').innerHTML = `Floor: ${room.floorNumber}`;
    document.getElementById('bedNumber').innerHTML = `Beds: ${room.bedNumber}`;
    document.getElementById('price').innerHTML = `${room.price} SAR`;
    document.getElementById('desc').innerHTML = room.desc;

    document.getElementById('room-data').style.display = 'flex';
})()