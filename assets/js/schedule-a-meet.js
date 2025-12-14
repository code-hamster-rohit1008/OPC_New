import { showBtnPreLoader } from "./pre-loader.js";

const scheduleAMeetSignInBtn = document.getElementById("schedule-a-meet-sign-in-btn");
scheduleAMeetSignInBtn.addEventListener("click", () => {
    window.location.href = "sign-in.html";
});

async function fetchAvailableTimeSlots(selectedDate) {
    try {
        const response = await fetch(
            `https://opc-backend-828246651523.europe-west1.run.app/meet/timings?date=${selectedDate.toISOString().split('T')[0]}`
        );
        const data = await response.json();
        if (data.status_code == 200) {
            await populateTimeSlots(data.available_time_slots);
        }
    } catch (error) { }
}

async function populateTimeSlots(timeSlots) {
    const timeInput = document.getElementById("time");
    timeInput.innerHTML = '<option value="" disabled selected>Select Time Slot *</option>';
    timeSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeInput.appendChild(option);
    });
}

function scheduleMeetFormData() {
    const nameInput = document.getElementById("name").value;
    if (!nameInput) {
        alert("Please enter your name.");
        return;
    }
    const emailInput = document.getElementById("email").value;
    if (!emailInput) {
        alert("Please enter your email.");
        return;
    }
    const userTypeSelect = document.getElementById("type").value;
    if (!userTypeSelect) {
        alert("Please select a user type.");
        return;
    }
    const dateInput = document.getElementById("date").value;
    if (!dateInput) {
        alert("Please select a date.");
        return;
    }
    const timeInput = document.getElementById("time").value;
    if (!timeInput) {
        alert("Please select a time.");
        return;
    }
    return {
        name: nameInput,
        emails: emailInput,
        user_type: userTypeSelect,
        date: dateInput,
        time_slot: timeInput,
    };
}

async function sendScheduleMeetToServer(formData) {
    try {
        showBtnPreLoader(scheduleFormBtn, true, '');
        const response = await fetch("https://opc-backend-828246651523.europe-west1.run.app/meet/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.status_code == 200) {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error scheduling meet:", error);
        alert("An error occurred while scheduling the meet. Please try again later.");
    }
    finally {
        showBtnPreLoader(scheduleFormBtn, false, "SCHEDULE THE MEET <i class='bx  bx-arrow-right-stroke'  ></i>");
    }
}

const dateInput = document.getElementById("date");
dateInput.addEventListener("change", async () => {
    const selectedDate = new Date(dateInput.value);
    await fetchAvailableTimeSlots(selectedDate);
});

const scheduleFormBtn = document.getElementById("schedule-meet-form-btn");
scheduleFormBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = scheduleMeetFormData();
    if (!formData) return;
    sendScheduleMeetToServer(formData);
});
