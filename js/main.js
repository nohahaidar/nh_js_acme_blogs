function createElemWithText(tagName = "p", textContent = "", className) {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    if (className) element.className = className;
    return element;
}
