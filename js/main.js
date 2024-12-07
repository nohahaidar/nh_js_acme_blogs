//Everytime a function is done, save it, ' git commit -a -m "comment" ', then ' git push '
function createElemWithText(elemType = "p", textContent = "", className) {
    const element = document.createElement(elemType);
    element.textContent = textContent;
    if (className) element.className = className;
    return element;
}

function createSelectOptions(users) {
    if (!users) return undefined;
    return users.map(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        return option;
    });
}

function toggleCommentSection(postId) {
    if (!postId) return undefined;

    const section = document.querySelector(`section[data-post-id='${postId}']`);
    
    if (!section) return null;
    
    section.classList.toggle('hide');
    return section;
}




