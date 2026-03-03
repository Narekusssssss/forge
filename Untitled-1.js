// 1. Открытие/Закрытие меню
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// 2. Работа с данными (Local Storage)
let posts = JSON.parse(localStorage.getItem('my_posts')) || [];

// 3. Отображение постов при загрузке
function renderPosts() {
    const list = document.getElementById('postsList');
    list.innerHTML = '';

    posts.forEach((post, index) => {
        const postCard = `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <small style="color: #64748b">${post.date}</small>
                    <button onclick="deletePost(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                        <span class="material-icons" style="font-size: 18px;">delete</span>
                    </button>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('afterbegin', postCard);
    });
}

// 4. Создание поста
function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) {
        alert("Заполните заголовок и текст!");
        return;
    }

    const newPost = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString('ru-RU')
    };

    posts.push(newPost);
    localStorage.setItem('my_posts', JSON.stringify(posts));
    
    // Очистка полей
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    
    renderPosts();
}

// 5. Удаление поста
function deletePost(index) {
    if(confirm("Удалить этот пост?")) {
        posts.splice(index, 1);
        localStorage.setItem('my_posts', JSON.stringify(posts));
        renderPosts();
    }
}

// Инициализация
renderPosts();