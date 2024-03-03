async function addRoom()
{

    const roomNumber = parseInt(document.getElementById("roomNumber").value);
    const floorNumber = parseInt(document.getElementById("floorNumber").value);
    const bedNumber = parseInt(document.getElementById("bedNumber").value);
    const price = parseFloat(document.getElementById("price").value);
    const desc = document.getElementById("desc").value;

        await roomsCollection.add({
            roomNumber,
            floorNumber,
            bedNumber,
            price,
            desc,
            
        });


    window.location.href = "/admin/rooms.html";
}