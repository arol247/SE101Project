document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // 📌 Collect Form Data
        const formData = {
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
        };

        // 📌 Send Data to Backend (API)
        try {
            const response = await fetch("http://localhost:3306/saveFormData", { // Ensure this URL matches your backend endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.success || result.error); // Show success or error message
            form.reset(); // Clear the form
        } catch (error) {
            alert("❌ Error submitting form: " + error.message);
        }
    });
});
