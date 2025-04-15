document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // 📌 Collect Form Data
        const formData = {

            // Junior high register 
            first_name: document.getElementById("first_name").value,
            middle_name: document.getElementById("middle_name").value,
            last_name: document.getElementById("last_name").value,
            sex: document.getElementById("sex").value,
            civil_status: document.getElementById("civil_status").value,
            nationality: document.getElementById("nationality").value,
            birth_date: document.getElementById("birth_date").value,
            birth_place: document.getElementById("birth_place").value,
            father: document.getElementById("father").value,
            father_occupation: document.getElementById("father_occupation").value,
            mother: document.getElementById("mother").value,
            mother_occupation: document.getElementById("mother_occupation").value,
            guardian: document.getElementById("guardian").value,
            relationship: document.getElementById("relationship").value,
            contact_number: document.getElementById("contact_number").value,
            address: document.getElementById("address").value,
            lrn: document.getElementById("lrn").value,
            primary: document.getElementById("primary").value,
            intermediate: document.getElementById("intermediate").value

             // admin register 
             

        };

        // 📌 Send Data to Backend (API)
        try {
            const response = await fetch("http://localhost:5000/displayData", { // Ensure this URL matches your backend endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message || result.error); // Show success or error message
            form.reset(); // Clear the form
        } catch (error) {
            alert("❌ Error submitting form: " + error.message);
        }
    });
});

function toggleFields() {
    const level = document.getElementById("education_level").value;
    const juniorFields = document.getElementById("junior-fields");
    const seniorFields = document.getElementById("senior-fields");

    if (level === "junior") {
        juniorFields.style.display = "block";
        seniorFields.style.display = "none";
    } else if (level === "senior") {
        juniorFields.style.display = "none";
        seniorFields.style.display = "block";
    } else {
        juniorFields.style.display = "none";
        seniorFields.style.display = "none";
    }
}

// Function to toggle strand categories based on selected strand
function toggleStrandCategories() {
    const strand = document.getElementById("strand").value;

    const categories = {
        STEM: document.getElementById("stem-categories"),
        TVL: document.getElementById("tvl-categories"),
        ABM: document.getElementById("abm-categories"),
        HUMSS: document.getElementById("humss-categories"),
        GAS: document.getElementById("gas-categories"),
    };

    // Hide all categories
    Object.values(categories).forEach((category) => {
        category.style.display = "none";
    });

    // Show the selected strand's category
    if (categories[strand]) {
        categories[strand].style.display = "block";
    }
}

