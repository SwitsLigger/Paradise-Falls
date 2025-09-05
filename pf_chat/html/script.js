/**
 * Configuration
 * Stores group permissions, their corresponding gradient colors, and a unique emoji.
 */
const Config = {
    // ------------------------------------------------------------
    // WELCOME TO CORE CHAT
    // A FEATURE-RICH CHAT SYSTEM FOR FIVEM
    // ------------------------------------------------------------

    // -- GROUPS & BANNERS --
    // Defines the permission groups that determine a player's banner style.
    // To assign a player to a group, give them the ACE permission: "chat.(groupname)"
    // Example: add_ace group.admin chat.admin allow
    //
    // You can add as many groups as you like. The script will assign the player
    // the first group they have permission for in the list below (priority matters).
    Groups: {
        // Add an 'emoji' property to each group. Leave it empty ('') if you don't want one.
        'default': { colors: ['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab'], emoji: '' },
        'vip': { colors: ['#FFD700', '#FFA500', '#FFD700', '#FF8C00'], emoji: '⭐' },
        'admin': { colors: ['#F00000', '#DC143C', '#FF4500', '#B22222'], emoji: '👑' }
    },

    // -- COMMAND TAGS --
    // Defines the style for special command tags that appear in messages (e.g., OOC, TWEET).
    CommandTags: {
        'ooc': { text: 'OOC', colors: ['#6c757d', '#495057', '#6c757d', '#343a40'] },
        'me': { text: 'ME', colors: ['#17a2b8', '#138496', '#17a2b8', '#117a8b'] },
        'tweet': { text: 'TWEET', colors: ['#00aced', '#0084b4', '#00aced', '#006284']},
        'announce': { text: 'ANNOUNCE', colors: ['#fd7e14', '#e85a00', '#fd7e14', '#c54c00']}
    }
};

// --- STATE MANAGEMENT ---
let chatState = {
    visible: false,
    inputActive: false,
    timeout: null,
    suggestions: [],
    playerName: 'Player',
    currentAutocomplete: null
};

/**
 * NUI Communication Wrapper
 */
function post(eventName, data = {}) {
    fetch(`https://core_chat/${eventName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
    }).catch(err => console.error(`Error posting to ${eventName}:`, err));
}

/**
 * Main function to add a standard message to the chat container.
 */
function addMessage(data) {
    const messageList = document.getElementById('message-list');
    if (!messageList) return;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'home-container2 pop-in'; // Use pop-in animation

    const authorSpan = document.createElement('span');
    authorSpan.className = 'home-text';
    
    const permissionGroup = data.permissionGroup || 'default';
    const groupInfo = Config.Groups[permissionGroup] || Config.Groups['default'];
    const authorName = (data.author || 'System').toUpperCase();
    
    authorSpan.textContent = `${groupInfo.emoji} ${authorName}`.trim();
    
    const gradientColors = groupInfo.colors;
    authorSpan.style.background = `linear-gradient(-45deg, ${gradientColors.join(', ')})`;
    authorSpan.style.backgroundSize = '400% 400%';
    authorSpan.style.animation = 'gradient 5s ease infinite';
    messageContainer.appendChild(authorSpan);

    const textSpan = document.createElement('span');
    textSpan.className = 'home-text1';

    let innerHTML = '';
    if (data.commandType && Config.CommandTags[data.commandType]) {
        const tagInfo = Config.CommandTags[data.commandType];
        const tagColors = tagInfo.colors;
        const tagStyle = `background: linear-gradient(-45deg, ${tagColors.join(', ')}); background-size: 400% 400%; animation: gradient 8s ease infinite;`;
        innerHTML += `<span class="command-tag" style="${tagStyle}">${tagInfo.text}</span>`;
    }
    innerHTML += data.text;
    textSpan.innerHTML = innerHTML;
    
    messageContainer.appendChild(textSpan);

    messageList.appendChild(messageContainer);
    messageList.scrollTop = messageList.scrollHeight;
    showChatTemporarily();
}

/**
 * Adds a special system message with a unique style.
 * @param {string} text - The message content.
 */
function addSystemMessage(text) {
    const messageList = document.getElementById('message-list');
    if (!messageList) return;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'system-message-container pop-in';

    const textSpan = document.createElement('span');
    textSpan.className = 'system-message-text';
    textSpan.textContent = text;

    messageContainer.appendChild(textSpan);
    messageList.appendChild(messageContainer);
    messageList.scrollTop = messageList.scrollHeight;
    showChatTemporarily();
}


/**
 * Shows the chat window and resets the hide timer.
 */
function showChatTemporarily() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    clearTimeout(chatState.timeout);
    chatContainer.classList.remove('slide-left');
    chatContainer.classList.add('slide-right');
    chatContainer.style.display = 'block';
    chatState.visible = true;
    chatState.timeout = setTimeout(() => {
        if (!chatState.inputActive) hideChat();
    }, 10000);
}

/**
 * Hides the chat window.
 */
function hideChat() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    chatContainer.classList.remove('slide-right');
    chatContainer.classList.add('slide-left');
    chatState.visible = false;
    setTimeout(() => {
        if (!chatState.visible) chatContainer.style.display = 'none';
    }, 500);
}

/**
 * Creates and displays the chat input field.
 */
function showInput(name, permissionGroup) {
    if (chatState.inputActive) return;
    chatState.playerName = name;
    chatState.inputActive = true;

    const messageList = document.getElementById('message-list');
    if (!messageList) return;

    const inputContainer = document.createElement('div');
    inputContainer.className = 'home-container2';
    inputContainer.id = 'input-box';
    inputContainer.style.width = '100%';

    const authorSpan = document.createElement('span');
    authorSpan.className = 'home-text';
    
    const groupInfo = Config.Groups[permissionGroup] || Config.Groups['default'];
    authorSpan.textContent = `${groupInfo.emoji} ${name.toUpperCase()}`.trim();
    
    const gradientColors = groupInfo.colors;
    authorSpan.style.background = `linear-gradient(-45deg, ${gradientColors.join(', ')})`;
    authorSpan.style.backgroundSize = '400% 400%';
    authorSpan.style.animation = 'gradient 5s ease infinite';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const inputText = document.createElement('span');
    inputText.className = 'home-text1';
    inputText.id = 'input-text';
    inputText.contentEditable = 'true';

    const inputHint = document.createElement('span');
    inputHint.id = 'input-hint';
    inputHint.className = 'home-text1';

    inputWrapper.appendChild(inputText);
    inputWrapper.appendChild(inputHint);
    inputContainer.appendChild(authorSpan);
    inputContainer.appendChild(inputWrapper);
    messageList.appendChild(inputContainer);

    showChatTemporarily();
    inputText.focus();
    messageList.scrollTop = messageList.scrollHeight;

    inputText.addEventListener('input', handleInputChange);
    inputText.addEventListener('keydown', handleKeyDown);
    
    const suggestionsContainer = document.getElementById('suggestions-container');
    const inputBoxRect = inputContainer.getBoundingClientRect();
    suggestionsContainer.style.top = `${inputBoxRect.bottom + 5}px`;
    suggestionsContainer.style.left = `${inputBoxRect.left}px`;
}

/**
 * Removes the chat input field.
 */
function hideInput() {
    const inputBox = document.getElementById('input-box');
    if (inputBox) inputBox.remove();
    const suggestionsContainer = document.getElementById('suggestions-container');
    if (suggestionsContainer) suggestionsContainer.style.display = 'none';
    chatState.inputActive = false;
    chatState.currentAutocomplete = null;
    post('close');
    showChatTemporarily();
}

/**
 * Handles input changes to show/hide/filter suggestions.
 */
function handleInputChange(e) {
    const text = e.target.textContent;
    const suggestionsContainer = document.getElementById('suggestions-container');
    chatState.currentAutocomplete = null;

    if (text.startsWith('/')) {
        const currentCommand = text.toLowerCase();
        const filtered = chatState.suggestions.filter(s => s.name.toLowerCase().startsWith(currentCommand));
        renderSuggestions(filtered);
        
        if (filtered.length > 0) {
            suggestionsContainer.style.display = 'block';
            if (filtered[0].name.toLowerCase() !== currentCommand) {
                chatState.currentAutocomplete = filtered[0];
            }
        } else {
            suggestionsContainer.style.display = 'none';
        }
    } else {
        suggestionsContainer.style.display = 'none';
    }
    updateAutocompleteHint(text);
}

/**
 * Renders the opaque autocomplete hint text.
 */
function updateAutocompleteHint(currentText) {
    const hintEl = document.getElementById('input-hint');
    if (!hintEl) return;

    if (chatState.currentAutocomplete) {
        const suggestion = chatState.currentAutocomplete.name;
        if (suggestion.toLowerCase().startsWith(currentText.toLowerCase())) {
            const remaining = suggestion.substring(currentText.length);
            hintEl.textContent = currentText.replace(/ /g, '\u00A0') + remaining;
        } else {
            hintEl.textContent = '';
        }
    } else {
        hintEl.textContent = '';
    }
}


/**
 * Handles key presses for tab-completion.
 */
function handleKeyDown(e) {
    if (e.key === 'Tab' && chatState.currentAutocomplete) {
        e.preventDefault();
        const inputText = document.getElementById('input-text');
        inputText.textContent = chatState.currentAutocomplete.name + ' ';
        
        inputText.dispatchEvent(new Event('input', { bubbles: true }));

        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(inputText);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

/**
 * Renders the suggestion list in the UI.
 */
function renderSuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    if (!suggestionsList) return;
    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'suggestion-name';
        nameSpan.textContent = suggestion.name;
        const helpSpan = document.createElement('span');
        helpSpan.className = 'suggestion-help';
        helpSpan.textContent = suggestion.help;
        item.appendChild(nameSpan);
        item.appendChild(helpSpan);
        item.addEventListener('click', () => {
            const inputText = document.getElementById('input-text');
            inputText.textContent = suggestion.name + ' ';
            inputText.dispatchEvent(new Event('input', { bubbles: true }));
            inputText.focus();
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(inputText);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        });
        // FIX: The missing line that adds the item to the list
        suggestionsList.appendChild(item);
    });
}

/**
 * Handles global key presses for submitting or canceling chat.
 */
function handleGlobalKeyUp(e) {
    if (e.key === 'Escape' && chatState.inputActive) {
        hideInput();
    } else if (e.key === 'Enter' && chatState.inputActive) {
        const inputText = document.getElementById('input-text');
        const message = inputText.textContent.trim();
        post('message', { message: message });
        hideInput();
    }
}

/**
 * Initializes the chat UI on document load.
 */
function initializeChat() {
    const container = document.createElement('div');
    container.id = 'chat-container';
    container.style.display = 'none';
    const messageList = document.createElement('div');
    messageList.id = 'message-list';
    messageList.className = 'home-container1';
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestions-container';
    const suggestionsList = document.createElement('div');
    suggestionsList.id = 'suggestions-list';
    suggestionsContainer.appendChild(suggestionsList);
    container.appendChild(messageList);
    document.body.appendChild(container);
    document.body.appendChild(suggestionsContainer);

    window.addEventListener('keyup', handleGlobalKeyUp);

    window.addEventListener('message', (event) => {
        const data = event.data;
        switch (data.type) {
            case 'ON_MESSAGE':
                addMessage(data.message);
                break;
            case 'SYSTEM':
                addSystemMessage(data.system);
                break;
            case 'ON_OPEN':
                showInput(data.name, data.permissionGroup);
                break;
            case 'ON_SUGGESTION_ADD':
                chatState.suggestions.push(data.suggestion);
                chatState.suggestions = chatState.suggestions.filter((s, i, self) => i === self.findIndex((t) => t.name === s.name));
                break;
            case 'ON_CLEAR':
                messageList.innerHTML = '';
                break;
            case 'ON_SUGGESTION_REMOVE':
                 chatState.suggestions = chatState.suggestions.filter(s => s.name !== data.name);
                 break;
        }
    });
    post('loaded');
}

document.addEventListener('DOMContentLoaded', initializeChat);
