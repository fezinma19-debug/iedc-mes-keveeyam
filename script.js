// ========================================
// LOAD MEMBERS
// ========================================

async function getMembers() {

    const response = await fetch("data/members.json");

    if (!response.ok) {
        throw new Error(
            `Could not load members.json. Status: ${response.status}`
        );
    }

    return await response.json();
}


// ========================================
// LOAD EXEcom CARDS ON HOMEPAGE
// ========================================

async function loadMembers() {

    try {

        const members = await getMembers();

        const container =
            document.getElementById("members-container");

        // If this element doesn't exist,
        // we are probably on the member page.
        if (!container) {
            return;
        }

        container.innerHTML = "";

        members.forEach(member => {

            const card = document.createElement("a");

            card.classList.add("member-card");

            card.href = `member.html?id=${member.id}`;

            card.innerHTML = `

                <img
                    src="${member.photo}"
                    alt="${member.name}"
                    class="member-photo"
                >

                <div class="member-info">

                    <h3>
                        ${member.name}
                    </h3>

                    <p class="member-post">
                        ${member.post}
                    </p>

                </div>

            `;

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error("Error loading members:", error);

        const container =
            document.getElementById("members-container");

        if (container) {

            container.innerHTML = `
                <p>
                    Unable to load Execom members.
                </p>
            `;

        }

    }

}


// ========================================
// LOAD INDIVIDUAL MEMBER
// ========================================

async function loadMemberPage() {

    try {

        const members = await getMembers();

        // Get the ID from the URL
        //
        // Example:
        // member.html?id=arjun
        //

        const urlParams =
            new URLSearchParams(window.location.search);

        const memberId =
            urlParams.get("id");


        // Find the correct member

        const member =
            members.find(
                person => person.id === memberId
            );


        // If member doesn't exist

        if (!member) {

            document.getElementById("member-name").textContent =
                "Member Not Found";

            return;

        }


        // ========================================
        // BASIC INFORMATION
        // ========================================

        document.getElementById("member-name").textContent =
            member.name;

        document.getElementById("member-post").textContent =
            member.post;

        document.getElementById("member-photo").src =
            member.photo;

        document.getElementById("member-photo").alt =
            member.name;

        document.getElementById("member-introduction").textContent =
            member.introduction;


        // ========================================
        // EMAIL
        // ========================================

        const emailElement =
            document.getElementById("member-email");

        if (member.email) {

            emailElement.innerHTML = `
                ✉️
                <a href="mailto:${member.email}">
                    ${member.email}
                </a>
            `;

        }
        else {

            emailElement.style.display = "none";

        }


        // ========================================
        // PHONE
        // ========================================

        const phoneElement =
            document.getElementById("member-phone");

        if (member.phone) {

            phoneElement.innerHTML = `
                📞
                <a href="tel:${member.phone}">
                    ${member.phone}
                </a>
            `;

        }
        else {

            phoneElement.style.display = "none";

        }


        // ========================================
        // SOCIAL MEDIA
        // ========================================

        const socialContainer =
            document.getElementById("social-links");

        socialContainer.innerHTML = "";


        // Instagram

        if (member.instagram) {

            socialContainer.innerHTML += `

                <a
                    href="${member.instagram}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>

            `;

        }


        // LinkedIn

        if (member.linkedin) {

            socialContainer.innerHTML += `

                <a
                    href="${member.linkedin}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>

            `;

        }


        // ========================================
        // COLLEGE / IEDC
        // ========================================

        const organizationElement =
            document.getElementById("member-organization");

        if (organizationElement) {

            organizationElement.textContent =
                "IEDC MES KEVEEYAM COLLEGE";

        }

    }

    catch (error) {

        console.error(
            "Error loading member:",
            error
        );

    }

}


// ========================================
// RUN THE CORRECT FUNCTION
// ========================================

// Homepage
loadMembers();

// Individual member page
loadMemberPage();