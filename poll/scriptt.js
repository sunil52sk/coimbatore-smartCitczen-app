// document.addEventListener("DOMContentLoaded", function () {
// 	const pollForm = 
// 		document.getElementById("poll-form");
// 	const yesCount = 
// 		document.getElementById("yes-count");
// 	const noCount = 
// 		document.getElementById("no-count");
// 	let yesVotes = 0;
// 	let noVotes = 0;

// 	pollForm.addEventListener("submit", function (e) {

// 		// It will help to prevent the submission of 
// 		// form, so that following code can execute
// 		e.preventDefault();
// 		const formData = new FormData(pollForm);
// 		const userVote = formData.get("vote");

// 		if (userVote === "yes") {
// 			yesVotes++;
// 		} else if (userVote === "no") {
// 			noVotes++;
// 		}
// 		updateResults();
// 	});

// 	function updateResults() {
// 		yesCount.textContent = yesVotes;
// 		noCount.textContent = noVotes;
// 	}
// });
// scriptt.js

// document.addEventListener("DOMContentLoaded", function () {
//     const pollForm = document.getElementById("poll-form");
//     const thankYouMessage = document.getElementById("thank-you");

//     pollForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         // Check if a vote has already been submitted
//         if (!localStorage.getItem("voted")) {
//             const selectedOption = document.querySelector("input[name='vote']:checked");
//             if (selectedOption) {
//                 const voteValue = selectedOption.value;
//                 updateResults(voteValue);
//                 thankYouMessage.style.display = "block";

//                 // Set a flag in local storage to indicate that the user has voted
//                 localStorage.setItem("voted", "true");
//             }
//         }
//     });

//     function updateResults(voteValue) {
//         const yesCount = document.getElementById("yes-count");
//         const noCount = document.getElementById("no-count");

//         if (voteValue === "yes") {
//             yesCount.textContent = parseInt(yesCount.textContent) + 1;
//         } else if (voteValue === "no") {
//             noCount.textContent = parseInt(noCount.textContent) + 1;
//         }
//     }
// });
// scriptt.js

document.addEventListener("DOMContentLoaded", function () {
    const pollForm = document.getElementById("poll-form");
    const thankYouMessage = document.getElementById("thank-you");

    // Initialize vote counts from localStorage
    let yesCount = parseInt(localStorage.getItem("yesCount")) || 0;
    let noCount = parseInt(localStorage.getItem("noCount")) || 0;

    updateResults();

    pollForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check if a vote has already been submitted
        if (!localStorage.getItem("voted")) {
            const selectedOption = document.querySelector("input[name='vote']:checked");
            if (selectedOption) {
                const voteValue = selectedOption.value;
                updateResults(voteValue);
                thankYouMessage.style.display = "block";

                // Set a flag in local storage to indicate that the user has voted
                localStorage.setItem("voted", "true");
            }
        }
    });

    function updateResults(voteValue) {
        const yesCountElem = document.getElementById("yes-count");
        const noCountElem = document.getElementById("no-count");

        if (voteValue === "yes") {
            yesCount++;
            localStorage.setItem("yesCount", yesCount);
        } else if (voteValue === "no") {
            noCount++;
            localStorage.setItem("noCount", noCount);
        }

        yesCountElem.textContent = yesCount;
        noCountElem.textContent = noCount;
    }
});
