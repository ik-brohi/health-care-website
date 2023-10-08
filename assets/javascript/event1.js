// Function to open the edit event modal
function openEditEventModal(index) {
    const eventToEdit = eventsData[index];
    document.getElementById("edit-event-index").value = index;
    document.getElementById("edit-event-title").value = eventToEdit.title;
    document.getElementById("edit-event-date").value = eventToEdit.date;
    document.getElementById("edit-event-location").value = eventToEdit.location;
    document.getElementById("edit-event-description").value = eventToEdit.description;
    document.getElementById("editEventModal").style.display = "block";
}

// Function to close the edit event modal
function closeEditEventModal() {
    document.getElementById("editEventModal").style.display = "none";
}

// Event delegation for edit buttons
document.querySelector(".event-container").addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-event-button")) {
        const indexToEdit = event.target.getAttribute("data-index");
        openEditEventModal(indexToEdit);
    }
});

// Event delegation for save and cancel buttons in the edit event modal
document.getElementById("edit-event-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const indexToSave = document.getElementById("edit-event-index").value;
    const updatedTitle = document.getElementById("edit-event-title").value;
    const updatedDate = document.getElementById("edit-event-date").value;
    const updatedLocation = document.getElementById("edit-event-location").value;
    const updatedDescription = document.getElementById("edit-event-description").value;

    // Update the event data
    eventsData[indexToSave].title = updatedTitle;
    eventsData[indexToSave].date = updatedDate;
    eventsData[indexToSave].location = updatedLocation;
    eventsData[indexToSave].description = updatedDescription;

    // Refresh event cards
    refreshEventCards();

    // Close the edit event modal
    closeEditEventModal();
});

document.getElementById("cancel-edit-event").addEventListener("click", function () {
    // Close the edit event modal without saving changes
    closeEditEventModal();
});
