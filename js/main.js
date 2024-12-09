//Everytime a function is done, save it, ' git commit -a -m "comment" ', then ' git push '
//Function 1
function createElemWithText(elemType = "p", textContent = "", className) {
    const element = document.createElement(elemType);
    element.textContent = textContent;
    if (className) element.className = className;
    return element;
}

//Function 2
function createSelectOptions(users) {
    if (!users) return undefined;
    return users.map(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        return option;
    });
}

//Function 3
function toggleCommentSection(postId) {
    if (!postId) return undefined;

    const section = document.querySelector(`section[data-post-id='${postId}']`);
    
    if (!section) return null;
    
    section.classList.toggle('hide');
    return section;
}

//Function 4
function toggleCommentButton(postId) {
    if (!postId) return undefined;
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    if (!button) return null;
    button.textContent = button.textContent === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
    return button;
}

//Function 5
function deleteChildElements(parentElement) {
    if (!parentElement?.tagName) return undefined;
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}


//Function 6
/* function addButtonListeners() {
    const main = document.querySelector('main');
    const buttons = main?.querySelectorAll('button') || [];
    if (buttons.length === 0) return buttons;
    buttons.forEach(button => {
        const postId = button.dataset.postId;
        if (postId) {
            button.addEventListener('click', (e) => {
                toggleComments(e, postId);
            });
        }
    });
    return buttons;
}

function toggleComments(event, postId) {} */

function addButtonListeners() {
    const main = document.querySelector('main');
    if (!main) return [];

    const buttons = main.querySelectorAll('button');
    if (buttons.length === 0) return buttons;

    buttons.forEach(button => {
        const postId = button.dataset.postId;
        if (postId) {
            button.addEventListener('click', function (e) {
                toggleComments(e, postId);
            });
        }
    });

    return buttons;
}

function toggleComments(event, postId) {}

//Function 7
function removeButtonListeners() {
    const buttons = document.querySelectorAll('main button');
    buttons.forEach(button => {
        const postId = button.dataset.id;
        if (postId) {
            button.removeEventListener('click', toggleComments);
        }
    });
    return buttons;
}

//Function 8
function createComments(comments) {
    if (!comments) return;

    const fragment = document.createDocumentFragment();

    comments.forEach(comment => {
        const article = document.createElement('article');
        const h3 = createElemWithText('h3', comment.name);
        const p1 = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);

        article.append(h3, p1, p2);
        fragment.append(article);
    });

    return fragment;
}

//Funciton 9
function populateSelectMenu(users) {
    if (!users) return;

    const selectMenu = document.getElementById('selectMenu');
    const options = createSelectOptions(users);

    options.forEach(option => selectMenu.append(option));

    return selectMenu;
}

//Function 10
async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

//Function 11
async function getUserPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}




