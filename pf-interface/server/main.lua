local maxClient = GetConvarInt('sv_maxclients', 32)

RegisterNetEvent('interface:playerConnected', function()
    local src = source
    sfr:getStress(src)
    TriggerClientEvent('interface:updateDisplayValues', -1, nil, maxClient, #GetPlayers())
    Debug('interface:playerConnected', src)
end)


RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(src)
    sfr:getStress()
end)

AddEventHandler('playerDropped', function()
    local src = source
    TriggerClientEvent('interface:updateDisplayValues', -1, nil, maxClient, #GetPlayers())
    Debug('playerDropped', src)
end)

Citizen.CreateThread(function()
    local resource = GetCurrentResourceName()
    if resource == 'qs-interface' then
        verify = true
    end
    if verify ~= true then
        repeat
            Citizen.Wait(3000)
            print('^1[ERROR]^0: You have renamed the script! ^4qs-interface^0 must not be renamed.')
            print('^3[WARNING]^0: If you rename the script, your console will freeze and you won’t be able to access the game.')
            Citizen.Wait(5000)
            while true do
                -- Freeze the thread indefinitely
            end
        until verify == true
    end
end)

local function updateStress(amount)
    if not Config.Stress then
        return Debug('interface:updateStress', 'Stress is disabled.')
    end
    local src = source
    local jobName = sfr:getJobName(src)
    local newStress
    if not jobName or IsWhitelisted(jobName) then
        return Debug('interface:updateStress', 'Player is not in a job or is in a disabled job.')
    end
    local playerStress = sfr:getStress(src)
    newStress = playerStress + amount
    if newStress <= 0 then newStress = 0 end
    if newStress > 100 then newStress = 100 end
    sfr:updateStress(src, newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    Debug('interface:updateStress', src, newStress)
end

-- Update Stress every 15 seconds
CreateThread(function()
    while true do
        local players = GetPlayers()
        for _, src in ipairs(players) do
            local stateBag = Player(src).state
            if not stateBag.stressChanged then goto continue end
            db.updateStress(src, stateBag.stress)
            ::continue::
        end
        Wait(15000)
    end
end)

RegisterNetEvent('interface:updateStress', updateStress)
RegisterNetEvent('hud:server:GainStress', updateStress)

function IsWhitelisted(jobName)
    for _, v in pairs(Config.DisableJobsStress) do
        if jobName == v then
            return true
        end
    end
    return false
end

local externalSeatbeltScripts = {
    'esx_cruisecontrol'
}

AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        for k, v in pairs(externalSeatbeltScripts) do
            if GetResourceState(v) == 'started' then
                LoopError('Please remove ' .. v .. ' from your server.cfg. It has seatbelt function that conflicts with QS-Interface.')
            end
        end
        return
    end
    for k, v in pairs(externalSeatbeltScripts) do
        if resource == v then
            LoopError('Please remove ' .. v .. ' from your server.cfg. It has seatbelt function that conflicts with QS-Interface.')
        end
    end
end)
