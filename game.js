let roomsRef = firestore.collection("game-rooms");
let global_state = {
    profile_name: 'Major',
    last_updated: new Date()
}

let default_game_states = {
    roomId: 'toSet',
    createdBy: 'Major',
    createdAt: new Date(),
    status: 'open',
    maxPlayerCount: 8,
    theme: 'default',
    isLocked: 'false'
}

async function updateGlobalState(key, value) {
    global_state[key] = value;
    global_state['last_updated'] = new Date();
}

let l = console.log;

async function updateUIProfile(val) {
    document.getElementById('profile').innerHTML = val;

}

async function roomClicked(el) {
    l(el);
    document.getElementById('room-id').value = el.id;
}

async function updateUIRoomList(room_list) {
    let all_roomsRef = document.getElementById('all-rooms');
    let table_html = `
    <tr>
      <th>Room ID</th>
      <th>Created By</th>
      <th>Status</th>
      <th>Number of Players</th>
      <th>Theme</th>
      <th>Password</th>
    </tr>
    `;
    room_list.forEach(room => {
        room.playerCount = 0;
        let room_html = `
        <tr id="${room.roomId}" onclick="roomClicked(this)">
            <td>${room.roomId}</td>
            <td>${room.createdBy}</td>
            <td>${room.status}</td>
            <td>${room.playerCount}/${room.maxPlayerCount}</td>
            <td>${room.theme}</td>
            <td>${room.isLocked}</td>
        </tr>
        `
        table_html += room_html;
    });

    all_roomsRef.innerHTML = `<table> ${table_html} </table>`
}


async function initProfile() {
    try {
        let itemValue = await localforage.getItem('bg-profile_name')
        console.log(itemValue);
        if (itemValue) {
            updateGlobalState('profile_name', itemValue);
            updateUIProfile(itemValue);
        }
    } catch (error) {
        console.error(error);
    }
}


function setProfileValue() {
    localforage.setItem('bg-profile_name', 'karx')
        .then( (val) => {
            console.log(val);
        })
        .catch((e) => {
            console.error(e);
        });
}

async function initRooms() {
    
    
}

async function createRoom(roomVal) {
    let newRoomState ={...default_game_states};
    l(newRoomState);
    newRoomState.roomId = roomVal;
    newRoomState.createdBy = global_state.profile_name;
    newRoomState.createdAt = new Date();

    roomsRef.doc(roomVal).set({
        ...newRoomState
    });
}


async function init() {
    initProfile();
    initRooms();
}


init();

document.getElementById('create-room').addEventListener('click', (e) => {
    let roomVal = document.getElementById('room-id').value;
    l(`creating with roomVal as ${roomVal}`);
    createRoom(roomVal);
});

roomsRef.where("status","==","open").onSnapshot(
    (roomsSnapshot) => {
        let room_list = [];
        roomsSnapshot.forEach( (room) => {
           l(room.data()); 
           room_list.push(room.data());
        });
        updateUIRoomList(room_list);
    });
