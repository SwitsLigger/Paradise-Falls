local framework = {}
local QBCore = exports['qb-core']:GetCoreObject()

CreateThread(function()
    while not GameScreenReady do
        Wait(100)
    end
    while not LocalPlayer.state.isLoggedIn do
        Wait(100)
    end
    ToggleHud(true)
end)

function framework:getStatus()
    if not PlayerData or not PlayerData.metadata then
        Debug('framework:getStatus ::: PlayerData is nil')
        return {
            hunger = 0,
            thirst = 0,
            stress = 0
        }
    end
    return {
        hunger = PlayerData.metadata.hunger or 0,
        thirst = PlayerData.metadata.thirst or 0,
        stress = PlayerData.metadata.stress or 0
    }
end

RegisterNetEvent('interface:OnMoneyChange', function(type, amount, isMinus)
    local PlayerData = QBCore.Functions.GetPlayerData()
    if not PlayerData or not PlayerData.money then return end

    -- Update cash or bank amount
    if type == 'cash' then
        CashAmount = PlayerData.money['cash']
    elseif type == 'bank' then
        BankAmount = PlayerData.money['bank']
    end

    -- Prevent updates if no actual money change occurs
    if amount == 0 then return end

    -- Debugging or logging the transaction
    Debug(('Money Change: Type: %s | Amount: %d | Deducted: %s'):format(type, amount, tostring(isMinus)))

    -- Update UI or relevant interface
    UpdateDisplayValues()
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(PlayerData)
    if not PlayerData or not PlayerData.money then return end

    -- Update stored money values when data changes
    CashAmount = PlayerData.money['cash']
    BankAmount = PlayerData.money['bank']

    -- Call the UI update function if needed
    UpdateDisplayValues()
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    PlayerData = framework:getPlayerData()
    UpdateDisplayValues(cfr:getJobLabel())
    if not Config.HasMulticharacter then
        SendNUIMessage({
            type = 'CFG_TO_JS',
            data = Config
        })
    end
end)

RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
    PlayerData = nil
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(data)
    PlayerData = data
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate', function(jobData)
    PlayerData.job = jobData
    UpdateDisplayValues(cfr:getJobLabel())
end)

CreateThread(function()
    PlayerData = framework:getPlayerData()
    UpdateDisplayValues(cfr:getJobLabel())
end)

function framework:getPlayerData()
    return QBCore.Functions.GetPlayerData()
end

function framework:getIdentifier()
    return PlayerData.citizenid
end

function framework:getJobName()
    return PlayerData?.job?.name or 'unemployed'
end

function framework:getJobLabel()
    return PlayerData?.job?.label or 'Unemployed'
end

function framework:getJobGrade()
    return PlayerData?.job?.grade?.level or 0
end

function framework:getPlayers()
    return QBCore.Functions.GetPlayers()
end

RegisterNetEvent('consumables:client:Eat', function()
    TriggerServerEvent('hud:server:GainStress', -math.random(5, 15))
end)


RegisterNetEvent('consumables:client:Drink', function()
    TriggerServerEvent('hud:server:GainStress', -math.random(5, 15))
end)

RegisterNetEvent('consumables:client:DrinkAlcohol', function()
    TriggerServerEvent('hud:server:GainStress', -math.random(5, 15))
end)

RegisterNetEvent('hospital:client:RespawnAtHospital', function()
    TriggerServerEvent('hud:server:GainStress', -100)
end)

RegisterNetEvent('hospital:client:Revive', function()
    TriggerServerEvent('hud:server:GainStress', -100)
end)

return framework
