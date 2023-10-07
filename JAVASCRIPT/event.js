// Sample data for events
const eventsData = [
    {
        title: "Event 1",
        date: "January 15, 2023",
        location: "City, State",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        title: "Event 2",
        date: "February 10, 2023",
        location: "City, State",
        description: "Nulla facilisi. Duis vestibulum elit id efficitur.",
    },
];

// Function to create event cards and display them
function createEventCards() {
    const eventContainer = document.querySelector(".event-container");

    eventsData.forEach(function (event, index) {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
            <button class="edit-event-button" data-index="${index}">Edit</button>
            <button class="delete-event-button" data-index="${index}">Delete</button>
        `;

        eventContainer.appendChild(eventCard);
    });
}

// Function to create a new event
function createEvent(title, date, location, description) {
    const newEvent = {
        title,
        date,
        location,
        description,
    };
    eventsData.push(newEvent);
    refreshEventCards();
}

// Function to handle event deletion when the delete button is clicked
function deleteEvent(index) {
    eventsData.splice(index, 1);
    refreshEventCards();
}

// Function to refresh event cards after a deletion
function refreshEventCards() {
    const eventContainer = document.querySelector(".event-container");
    eventContainer.innerHTML = "";
    createEventCards();
}

// Event delegation for delete buttons
document.querySelector(".event-container").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-event-button")) {
        const indexToDelete = event.target.getAttribute("data-index");
        deleteEvent(indexToDelete);
    }
});

// Handle Create Event button click
document.getElementById("create-event-btn").addEventListener("click", function () {
    // Open a modal or perform any action to create a new event
    // For simplicity, we'll use a prompt here
    const title = prompt("Event Title:");
    const date = prompt("Event Date:");
    const location = prompt("Event Location:");
    const description = prompt("Event Description:");

    if (title && date && location && description) {
        createEvent(title, date, location, description);
    } else {
        alert("Please fill in all fields to create an event.");
    }
});

// Create event cards on page load
createEventCards();
