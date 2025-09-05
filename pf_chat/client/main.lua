

-- VARIABLES
local chatInputActive = false
local chatInputActivating = false
local chatHidden = true
local chatLoaded = false
local myPermissionGroup = 'default' 

--[[----------------------------------------------------------------
  Core Functions
------------------------------------------------------------------]]

local function refreshCommands()
    
    SendNUIMessage({ type = 'ON_SUGGESTION_ADD', suggestion = { name = '/ooc', help = 'Out of Character chat.' } })
    SendNUIMessage({ type = 'ON_SUGGESTION_ADD', suggestion = { name = '/me', help = 'Describe an action.' } })
    SendNUIMessage({ type = 'ON_SUGGESTION_ADD', suggestion = { name = '/tweet', help = 'Send a tweet.' } })
    SendNUIMessage({ type = 'ON_SUGGESTION_ADD', suggestion = { name = '/announce', help = 'Make an announcement (requires permission).' } })


    if GetRegisteredCommands then
        local registeredCommands = GetRegisteredCommands()
        for _, command in ipairs(registeredCommands) do
            SendNUIMessage({
                type = 'ON_SUGGESTION_ADD',
                suggestion = { name = '/' .. command.name, help = '' }
            })
        end
    end
end



RegisterNUICallback('loaded', function(data, cb)
    chatLoaded = true
    TriggerServerEvent('chat:init')
    TriggerServerEvent('chat:requestMyPermissions')
    refreshCommands()
    cb('ok')
end)

RegisterNUICallback('message', function(data, cb)
    if data.message and data.message ~= "" then
        if data.message:sub(1, 1) == '/' then
            ExecuteCommand(data.message:sub(2))
        else
            TriggerServerEvent('_chat:messageEntered', data.message)
        end
    end
    chatInputActive = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('close', function(data, cb)
    chatInputActive = false
    SetNuiFocus(false, false)
    cb('ok')
end)


RegisterNetEvent('chat:receiveMyGroup')
AddEventHandler('chat:receiveMyGroup', function(group)
    myPermissionGroup = group
end)

RegisterNetEvent('chat:addMessage')
AddEventHandler('chat:addMessage', function(messageData)
    SendNUIMessage({
        type = 'ON_MESSAGE',
        message = messageData
    })
end)

RegisterNetEvent('__cfx_internal:serverPrint')
AddEventHandler('__cfx_internal:serverPrint', function(msg)
     if msg == '' or myPermissionGroup ~= 'admin' or Config.ServerConsoleForAdmins == false then
        return
    end
    SendNUIMessage({
        type = 'SYSTEM',
        system = msg
    })
end)

RegisterNetEvent('chat:addSuggestion')
AddEventHandler('chat:addSuggestion', function(name, help)
    SendNUIMessage({
        type = 'ON_SUGGESTION_ADD',
        suggestion = { name = name, help = help, params = nil }
    })
end)


RegisterNetEvent('chat:clear')
AddEventHandler('chat:clear', function()
    SendNUIMessage({ type = 'ON_CLEAR' })
end)



Citizen.CreateThread(function()
    SetTextChatEnabled(false)
    SetNuiFocus(false, false)

    while true do
        Wait(0)

        if not chatInputActive then
            if IsControlJustPressed(0, 245) then 
                chatInputActive = true
                chatInputActivating = true
                SendNUIMessage({
                    type = 'ON_OPEN',
                    name = GetPlayerName(PlayerId()),
                    permissionGroup = myPermissionGroup
                })
            end
        end

        if chatInputActivating then
            if not IsControlPressed(0, 245) then
                SetNuiFocus(true, true)
                chatInputActivating = false
            end
        end

        if chatLoaded then
            local shouldBeHidden = IsPauseMenuActive() or IsScreenFadedOut()
            if shouldBeHidden and not chatHidden then
                chatHidden = true
               
            elseif not shouldBeHidden and chatHidden then
                chatHidden = false
            end
        end
    end
end)
