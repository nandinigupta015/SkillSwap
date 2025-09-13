const users = [
    { id: "1001", name: "Rahul Sharma", expertIn: "Sports", exploring: "Dance", location: "Mumbai, India", mode: "Offline" },
    { id: "1002", name: "Priya Mehta", expertIn: "Technology", exploring: "UI/UX Design", location: "Delhi, India", mode: "Online" },
    { id: "1003", name: "Amit Verma", expertIn: "Music", exploring: "Photography", location: "Pune, India", mode: "Offline" },
    { id: "1004", name: "Sneha Kapoor", expertIn: "Art", exploring: "Craft Making", location: "Jaipur, India", mode: "Online" }
];

const userList = document.getElementById("user-list");
const skillFilter = document.getElementById("skillFilter");

function displayUsers(filter) {
    userList.innerHTML = "";

    users
        .filter(user => filter === "all" || user.expertIn.toLowerCase() === filter.toLowerCase())
        .forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");

            card.innerHTML = `
                <div class="user-card-body">
                    <div class="user-name">${user.name}</div>
                    <div class="divider"></div>
                    <div class="user-info"><span class="label">ID:</span> ${user.id}</div>
                    <div class="user-info"><span class="label">Expert In:</span> ${user.expertIn}</div>
                    <div class="user-info"><span class="label">Exploring:</span> ${user.exploring}</div>
                    <div class="user-info"><span class="label">Location:</span> ${user.location}</div>
                    <div class="user-info"><span class="label">Mode:</span> ${user.mode}</div>
                    <button class="send-btn">Send Request</button>
                </div>
            `;

            userList.appendChild(card);
        });

    // Add click event for Send Request buttons
    document.querySelectorAll(".send-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Request sent!");
        });
    });
}

// Initial display
displayUsers("all");

// Filter change event
if (skillFilter) {
    skillFilter.addEventListener("change", (e) => {
        displayUsers(e.target.value);
    });
}
