// ================================
// DARK MODE
// ================================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

    } else {

        themeButton.textContent = "🌙";

    }

});


// ================================
// LOAD BLOG POSTS
// ================================

async function loadPosts() {

    const articleGrid = document.getElementById("articleGrid");

    try {

        const response = await fetch(
            "http://localhost:5000/api/posts"
        );

        if (!response.ok) {

            throw new Error("Failed to fetch posts");

        }

        const posts = await response.json();

        articleGrid.innerHTML = "";

        posts.forEach(post => {

            const article = document.createElement("article");

            article.classList.add("card");

            article.innerHTML = `

                <div class="card-icon">📝</div>

                <p class="category">
                    ${post.category}
                </p>

                <h3>
                    ${post.title}
                </h3>

                <p>
                    ${post.content}
                </p>

                <button class="read-button"
                        data-id="${post.id}">
                    Read Article
                </button>

            `;

            articleGrid.appendChild(article);

        });


        // Read article buttons

        const readButtons =
            document.querySelectorAll(".read-button");

        readButtons.forEach(button => {

            button.addEventListener("click", () => {

                const postId =
                    button.getAttribute("data-id");

                alert(
                    `You selected article ${postId}`
                );

            });

        });

    } catch (error) {

        console.error(error);

        articleGrid.innerHTML = `

            <p>
                ❌ Could not connect to the backend.
                Make sure your Node.js server is running.
            </p>

        `;

    }

}


// Start loading posts

loadPosts();