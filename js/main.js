function createElemWithText(tagName = "p", textContent = "", className) {
    const element = document.createElement(tagName);
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

