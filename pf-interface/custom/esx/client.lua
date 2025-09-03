local framework = {}
local ESX = exports['es_extended']:getSharedObject()

local hunger, thirst = 0, 0

CreateThread(function()
    while not GameScreenReady do
        Wait(100)
    end
    while not ESX.IsPlayerLoaded() do
        Wait(100)
    end
    ToggleHud(true)
end)

function framework:getStatus()
    return {
        hunger = hunger,
        thirst = thirst,
        stress = LocalPlayer.state.stress or 0
    }
end

AddEventHandler('esx_status:onTick', function(status)
    TriggerEvent('esx_status:getStatus', 'hunger', function(status)
        hunger = status.val / 10000
    end)
    TriggerEvent('esx_status:getStatus', 'thirst', function(status)
        thirst = status.val / 10000
    end)
end)

local function initAccounts(xPlayer)
    if not xPlayer then
        xPlayer = ESX.GetPlayerData()
    end

    local accounts = xPlayer.accounts
    if accounts == nil then
        return
    end
    for _, data in pairs(accounts) do
        if data.name == 'bank' then
            BankAmount = data.money
        elseif data.name == 'money' then
            CashAmount = data.money
        end
    end
end

RegisterNetEvent('esx:setAccountMoney', function(account)
    if account.name == 'money' then
        CashAmount = account.money
    elseif account.name == 'bank' then
        BankAmount = account.money
    end
    UpdateDisplayValues()
end)

RegisterNetEvent('esx:playerLoaded', function(playerData)
    PlayerData = playerData
    Debug('player loaded', playerData)
    initAccounts(playerData)
    UpdateDisplayValues(cfr:getJobLabel())
    if not Config.HasMulticharacter then
        SendNUIMessage({
            type = 'CFG_TO_JS',
            data = Config
        })
    end
    Wait(500)
end)

function framework:getPlayerData()
    return ESX.GetPlayerData()
end

CreateThread(function()
    PlayerData = framework:getPlayerData()
    initAccounts(PlayerData)
    UpdateDisplayValues(cfr:getJobLabel())
end)

RegisterNetEvent('esx:setJob', function(jobData)
    PlayerData.job = jobData
    UpdateDisplayValues(cfr:getJobLabel())
end)

function framework:getIdentifier()
    return PlayerData?.identifier or 'none'
end

function framework:getJobName()
    return PlayerData?.job?.name or 'unemployed'
end

function framework:getJobLabel()
    return PlayerData?.job?.label or 'Unemployed'
end

function framework:getJobGrade()
    return PlayerData?.job?.grade or 0
end

function framework:getPlayers()
    return ESX.Game.GetPlayers()
end

RegisterNetEvent('esx_status:add', function()
    TriggerServerEvent('interface:updateStress', -math.random(5, 15))
end)

RegisterNetEvent('esx_basicneeds:healPlayer', function()
    TriggerServerEvent('interface:updateStress', -100)
end)

AddEventHandler('esx:onPlayerDeath', function()
    TriggerServerEvent('interface:updateStress', -100)
end)

return framework
