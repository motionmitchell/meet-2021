import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
var online = false;
var eventList = [];
var server = "http://localhost:5000/";
const emptyEvent = {
	eventId: 1,
	userId: 1,
	date: "",
	time: "",
	city: "",
	capacity: 32,
	contactInfo: { name: "", email: "", website: "" },
	title: "",
	description: "",
	status: 0
};
export const getEventList = createAsyncThunk(
	'todos/getEventList',
	async (payload) => {
		const fetchCount = payload.fetchCount;
		try {

			const resp = await fetch(server + 'events/' + fetchCount);
			if (resp.ok) {
				const events = await resp.json();
				online = true;
				saveEventList(events);  // put into local storage (cache)
				return { events };
			} else {
				online = false;
				let events = await fetchEventList(); // local storage for offline.
				return { events }
			}
		} catch (e) {
			online = false;
			let events = await fetchEventList(fetchCount); // local storage for offline.
			return { events }
		}
	}
);
const fetchEventList = async (fetchCount) => {
	let tList = eventList;
	let temp = localStorage.getItem("EVENTS");
	console.log("TEMP", temp);
	if (temp === null) {
		localStorage.setItem("EVENTS", JSON.stringify(eventList));
	} else {
		tList = JSON.parse(temp);
		if (fetchCount < tList.length) {
			let fetchList = [];
			for (let i = 0; i < fetchCount; i++) {
				fetchList.push(tList[i]);
			}
			tList = fetchList;
		}
	}
	console.log("eventList", tList);
	return tList;
}
const saveEventList = async (tl) => {
	localStorage.setItem("EVENTS", JSON.stringify(tl));
}
const pushEvent = async (event) => { // only offline.
	console.log("pushEvent", event)
	if (event.eventId > 0) {
		const msg = await updateEvent(event);
		if (msg !== "updated") {
			event.eventId = -1;
			event.title = msg;
		}
		return event;

	}
	const item =
	{
		eventId: new Date().getTime(),
		userId: event.userId,
		date: event.date,
		time: event.time,
		city: event.city,
		capacity: event.capacity,
		contactInfo: event.contactInfo,
		title: event.title,
		description: event.description,
		status: 0
	}
	console.log("PUSH TO LOCAL ", item);
	let temp = await fetchEventList();
	console.log("TEMP FROM FETCH", temp);
	temp.push(item);
	await saveEventList(temp);

	console.log("temp", temp);

	return event;
}
export const makeChartData = createAsyncThunk(
	'event/makeChartData',

	async () => {
		let temp = await fetchEventList();;
		const backgroundColors = [
			'rgba(255, 99, 132, 0.6)',
			'rgba(54, 162, 235, 0.6)',
			'rgba(255, 206, 86, 0.6)',
			'rgba(75, 192, 192, 0.6)',
			'rgba(153, 102, 255, 0.6)',
			'rgba(255, 159, 64, 0.6)',
			'rgba(255, 99, 132, 0.6)'
		]
		console.log("makeChartData.start...", temp);
		await temp.sort((a, b) => {
			return a.city > b.city;
		});
		console.log("TEMP", temp);

		let data = [];
		let labels = [];
		let colors = [];
		let lastCity = temp[0].city;
		let cnt = 0;
		data.push(0);
		labels.push(lastCity);

		colors.push('rgba(255, 99, 132, 0.6)');

		for (let i in temp) {
			console.log(cnt + ") CITY: " + temp[i].city);
			if (temp[i].city !== lastCity) {
				const idx = data.length - 1;

				data[idx] = cnt;
				lastCity = temp[i].city;
				cnt = 1;
				colors.push(backgroundColors[idx + 1]);

				data.push(cnt);
				labels.push(lastCity);
			} else {
				cnt++;
			}
		}

		data[data.length - 1] = cnt;
		const chartData = {
			labels: labels,
			datasets: [
				{
					label: 'Events',
					data: data,
					backgroundColor: colors
				}
			]
		}
		console.log("chartData", chartData);
		return chartData;
	}
);
const synchServer = async () => {
	let localData = []
	let temp = await fetchEventList();

	for (let i in temp) {
		if (temp[i].status === 0) {
			localData.push(temp[i]);
		}
	}
	try {
		const resp = await fetch(server + 'event/sync', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(localData),
		})
		if (resp.ok)
			return true;
		else
			return false;
	} catch (e) {
		return false; // local storage
	}
}
const updateEvent = async (event) => {
	console.log("updateEvent: ", event)
	let temp = await fetchEventList();
	const id = parseInt(event.eventId);
	event.eventId = id;
	for (let i in temp) {
		console.log(id + " COMPARE TO: ", temp[i]);
		if (temp[i].eventId === id) {
			console.log("UPDATING: ", event, temp[i]);
			if (temp[i].city !== event.city || temp[i].date !== event.date || temp[i].time !== event.time) {
				return "city/date/time change not allowed in offline mode";
			}
			temp[i] = event;
		}
	}
	await saveEventList(temp);
	return "updated";
};
const pushEventToServer = async (event) => {
	console.log("pushEventToServer", event)

	const item =
	{
		eventId: event.eventId,
		userId: event.userId,
		date: event.date,
		time: event.time,
		city: event.city,
		capacity: event.capacity,
		contactInfo: event.contactInfo,
		title: event.title,
		description: event.description
	}

	try {
		const resp = await fetch(server + 'event/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		})
	} catch (e) {
		return await pushEvent(event); // local storage
	}
	return event;
}
export const addEventItem = createAsyncThunk(
	'event/addEventItem',
	async (payload) => {
		const msg = payload.event.eventId === 0 ? "Event added" : "Event updated";
		const event = await pushEventToServer(payload.event);

		console.log("EVENT: ", event);
		console.log("EVENTS", eventList);

		console.log("EVENT ADDED: ", event);
		const message = (event.eventId > 0 ? msg : event.title);
		console.log("addEventItem.message: " + message);
		return { message };
	}
);

export const deleteEventItem = createAsyncThunk(
	'todos/deleteEventItem',
	async (payload) => {
		let events = fetchEventList();
		let temp = [];

		events.forEach((item) => {
			if (item.id !== payload.id) {
				temp.push(item);
			} else {
				console.log("DELETING ", item);
			}
		});
		saveEventList(temp);

		return { id: payload.id };
	}
);
export const getEvent = createAsyncThunk(
	'todos/getEvent',
	async (payload) => {

		let events = await fetchEventList();
		let temp = { };
		const id = parseInt(payload.id);
		if (id === 0) {
			const event = emptyEvent;
			return { event };
		}
		for (let i in events) {
			const event = events[i]
			if (event.eventId === id) {
				console.log("FOUND: ", event);
				return { event };
			}
		}
	}
);
export const eventSlice = createSlice({
	name: 'events',
	initialState: [],
	reducers: {
		addEvent: (state, action) => {
			const event = action.payload.event;

			state.push(event);
		},
		deleteEvent: (state, action) => {
			return state.filter((event) => event.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getEvent.fulfilled]: (state, action) => {
			return action.payload.event;
		},
		[addEventItem.fulfilled]: (state, action) => {
			return action.payload.message;
		},
		[getEvent.fulfilled]: (state, action) => {
			return action.payload.event;
		},
		[makeChartData.fulfilled]: (state, action) => {
			return action.payload.chartData;
		},
		[deleteEventItem.fulfilled]: (state, action) => {
			return state.filter((event) => event.id !== action.payload.id);
		},
	},
});

export const { addEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;