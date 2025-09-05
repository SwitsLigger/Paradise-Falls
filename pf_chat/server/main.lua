


local function getPlayerPermissionGroup(pSource)
    if pSource == 0 then return 'admin' end -- Console is always top tier
    for _, groupName in ipairs(Config.Groups) do
        if IsPlayerAceAllowed(pSource, 'chat.' .. groupName) then
            return groupName
        end
    end
    if IsPlayerAceAllowed(pSource, "command") then
        return 'admin'
    end
    return 'default'
end


local function broadcastMessage(pSource, messageText, commandType)
    local authorName = (pSource == 0) and 'Console' or GetPlayerName(pSource)
    

    local messageData = {
        author = authorName,
        text = messageText,
        permissionGroup = getPlayerPermissionGroup(pSource),
        commandType = commandType or nil 
    }


    TriggerClientEvent('chat:addMessage', -1, messageData)

    if Config.ServerLogs then
        local logMessage = string.format("[Chat] %s: %s", authorName, messageText)
        if commandType then
            logMessage = string.format("[%s] %s: %s", string.upper(commandType), authorName, messageText)
        end
        print(logMessage)
    end
end

--[[----------------------------------------------------------------
  Command Definitions
------------------------------------------------------------------]]

RegisterCommand('ooc', function(source, args, rawCommand)
    local message = table.concat(args, " ")
    if message == "" then return end
    broadcastMessage(source, message, 'ooc')
end, false)

RegisterCommand('me', function(source, args, rawCommand)
    local message = table.concat(args, " ")
    if message == "" then return end
    broadcastMessage(source, message, 'me')
end, false)

RegisterCommand('tweet', function(source, args, rawCommand)
    local message = table.concat(args, " ")
    if message == "" then return end
    broadcastMessage(source, message, 'tweet')
end, false)

RegisterCommand('announce', function(source, args, rawCommand)
    if IsPlayerAceAllowed(source, 'chat.announce') then
        local message = table.concat(args, " ")
        if message == "" then return end
        broadcastMessage(source, message, 'announce')
    else
        TriggerClientEvent('chat:addMessage', source, {
            author = 'System',
            text = 'You do not have permission to use this command.',
            permissionGroup = 'default',
            commandType = nil
        })
    end
end, false)

--[[----------------------------------------------------------------
  Event Handlers
------------------------------------------------------------------]]


RegisterNetEvent('_chat:messageEntered')
AddEventHandler('_chat:messageEntered', function(message)
    local source = source -- Capture the source of the event
    if not message or message == "" then return end
    broadcastMessage(source, message)
end)


RegisterNetEvent('chat:requestMyPermissions')
AddEventHandler('chat:requestMyPermissions', function()
    local source = source
    local playerGroup = getPlayerPermissionGroup(source)
    

    TriggerClientEvent('chat:receiveMyGroup', source, playerGroup)
end)


RegisterNetEvent('chat:init')
AddEventHandler('chat:init', function()
    local source = source
    local playerName = GetPlayerName(source)
    TriggerClientEvent('chat:addMessage', -1, {
        author = 'System',
        text = playerName .. ' has connected.',
        permissionGroup = 'default'
    })
end)


AddEventHandler('playerDropped', function(reason)
    local source = source
    local playerName = GetPlayerName(source)
    TriggerClientEvent('chat:addMessage', -1, {
        author = 'System',
        text = playerName .. ' has disconnected. (' .. reason .. ')',
        permissionGroup = 'default'
    })
end)


AddEventHandler('__cfx_internal:commandFallback', function(command)
    local source = source
    CancelEvent()
    TriggerClientEvent('chat:addMessage', source, {
        author = 'System',
        text = 'Unknown command: /' .. command,
        permissionGroup = 'default'
    })
end)
