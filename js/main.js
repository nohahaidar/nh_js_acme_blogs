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
    if (!userId) return undefined;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

//Function 12
async function getUser(userId) {
    if (!userId) return undefined;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

//Function 13
async function getPostComments(postId) {
    if (!postId) return undefined;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching post comments:', error);
    }
}

//Function 14
async function displayComments(postId) {
    if (!postId) return undefined;

    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');

    const comments = await getPostComments(postId);
    const fragment = createComments(comments);

    section.appendChild(fragment);
    return section;
}

//Function 15
async function createPosts(posts) {
    if (!posts) return undefined;
    const fragment = document.createDocumentFragment();

    for (const post of posts) {
        const article = document.createElement('article');

        const h2 = createElemWithText('h2', post.title);
        const pBody = createElemWithText('p', post.body);
        const pId = createElemWithText('p', `Post ID: ${post.id}`);

        const author = await getUser(post.userId);
        const pAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const pCatchPhrase = createElemWithText('p', author.company.catchPhrase);

        const button = document.createElement('button');
        button.textContent = 'Show Comments';
        button.dataset.postId = post.id;

        article.append(h2, pBody, pId, pAuthor, pCatchPhrase, button);

        const section = await displayComments(post.id);
        article.appendChild(section);

        fragment.appendChild(article);
    }

    return fragment;
}

//Function 16
async function displayPosts(posts) {
    const mainElement = document.querySelector('main');
    
    const element = posts?.length 
      ? await createPosts(posts) 
      : createElemWithText('p', 'No posts available');
      
    mainElement.appendChild(element);
    return element;
  } 

//Function 17
function toggleComments(event, postId) {
    if (!event || !postId) return;
  
    event.target.listener = true;
  
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
  
    return [section, button];
  }

//Function 18
async function refreshPosts(posts) {
    if (!posts) return undefined;

    const removeButtons = removeButtonListeners();
    
    const main = document.querySelector('main');
    const deleteResult = deleteChildElements(main);
    
    const fragment = await displayPosts(posts);
    
    const addButtons = addButtonListeners();
  
    return [removeButtons, deleteResult, fragment, addButtons];
  }

//Function 19
  /* async function selectMenuChangeEventHandler(event) {
    if (!event) return;
  
    const selectMenu = document.querySelector('#selectMenu');
    if (!selectMenu) return;
  
    selectMenu.disabled = true;
  
    const userId = event.target?.value || 1;
  
    const posts = await getUserPosts(userId);
  
    const refreshPostsArray = await refreshPosts(posts);
  
    selectMenu.disabled = false;
  
    return [userId, posts, refreshPostsArray];
  } 

   /* async function selectMenuChangeEventHandler(event) {
        if (!event?.target) return;
        const selectMenu = document.querySelector('#selectMenu');
        if (!selectMenu) return;
        selectMenu.disabled = true;
        const userId = parseInt(event.target.value) || 1;
        const posts = await getUserPosts(userId);
        if (!Array.isArray(posts)) return;
        const refreshPostsArray = await refreshPosts(posts);
        selectMenu.disabled = false;
        return [userId, posts, refreshPostsArray];
      } */

        /* async function selectMenuChangeEventHandler(event) {
            if (!event?.target?.value) return;
          
            const selectMenu = document.querySelector('#selectMenu');
            if (!selectMenu) return;
          
            selectMenu.disabled = true;
          
            const userId = parseInt(event.target.value) || 1;
            const posts = await getUserPosts(userId);
            if (!Array.isArray(posts) || posts.some(post => post.userId !== userId)) return;
          
            const refreshPostsArray = await refreshPosts(posts);
          
            selectMenu.disabled = false;
          
            return [userId, posts, refreshPostsArray];
          } */

            /* async function selectMenuChangeEventHandler(event) {
                if (event?.type !== 'change') return;
              
                const selectMenu = event?.target;
              
                if (!selectMenu) return;
              
                let userId;
              
                if (selectMenu.value === 'Employees' || selectMenu.value === '') {
                  userId = 1;
                } else {
                  userId = selectMenu.value;
                }
              
                selectMenu.disabled = true;
              
                const posts = await getUserPosts(userId);
                const refreshPostsArray = await refreshPosts(posts);
              
                selectMenu.disabled = false;
              
                return [userId, posts, refreshPostsArray];
              } */

                const selectMenuChangeEventHandler = async(e) =>{
                    if(!e) return;
                
                    document.querySelector('#selectMenu').disabled = true;
                    const userId = e?.target?.value || 1;
                    const postsJSONData = await getUserPosts(userId);
                    const refreshPostsArray = refreshPosts(postsJSONData);
                    document.querySelector('#selectMenu').disabled = false;
                    return [userId, postsJSONData, refreshPostsArray];
                }
              
            
            
          
//Function 20
async function initPage() {
    const users = await getUsers();
    if (!Array.isArray(users)) return;
    const select = populateSelectMenu(users);
    return [users, select];
  }
  
//Function 21
function initApp() {
    initPage();
    const selectMenu = document.querySelector('#selectMenu');
    if (selectMenu) {
      selectMenu.addEventListener('change', selectMenuChangeEventHandler);
    }
  }
  
  document.addEventListener('DOMContentLoaded', initApp);

     
        
          
      
  
  
  
  

