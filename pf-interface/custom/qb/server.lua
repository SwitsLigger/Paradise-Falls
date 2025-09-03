--[[
    Hi dear customer or developer, here you can fully configure your server's
    framework or you could even duplicate this file to create your own framework.

    If you do not have much experience, we recommend you download the base version
    of the framework that you use in its latest version and it will work perfectly.
]]

local framework = {}
local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('QBCore:Server:OnPlayerLoaded', function()
    local src = source
    Debug('Loaded player:', src)
end)

function framework:registerUsableItem(name, cb)
    QBCore.Functions.CreateUseableItem(name, cb)
end

function framework:getPlayerFromId(source)
    return QBCore.Functions.GetPlayer(source)
end

function framework:getSourceFromIdentifier(identifier)
    local src = QBCore.Functions.GetPlayerByCitizenId(identifier).PlayerData.source
    return src
end

function framework:getStress(source)
    local player = self:getPlayerFromId(source)
    if not player then
        return 0
    end
    return player.PlayerData.metadata.stress or 0
end

function framework:updateStress(source, value)
    local player = self:getPlayerFromId(source)
    player.Functions.SetMetaData('stress', value)
    return true
end

function framework:getIdentifier(source)
    if source == 0 then return 'automated' end
    local player = self:getPlayerFromId(source)
    return player.PlayerData.citizenid
end

function framework:getAccountMoney(source, account)
    local player = self:getPlayerFromId(source)
    if account == 'money' then account = 'cash' end
    return player.PlayerData.money[account]
end

function framework:removeAccountMoney(source, account, amount)
    local player = self:getPlayerFromId(source)
    if account == 'money' then account = 'cash' end
    if self:getAccountMoney(source, account) < amount then
        return false
    end
    player.Functions.RemoveMoney(account, amount)
    return true
end

function framework:addAccountMoney(source, account, amount)
    local player = self:getPlayerFromId(source)
    if account == 'money' then account = 'cash' end
    if account == 'black_money' then
        Debug('Black money setted to crypto')
        account = 'crypto'
    end
    player.Functions.AddMoney(account, amount)
end

function framework:removeItem(source, item, count)
    local player = self:getPlayerFromId(source)
    player.Functions.RemoveItem(item, count)
end

function framework:addItem(source, item, count)
    local player = self:getPlayerFromId(source)
    return player.Functions.AddItem(item, count)
end

function framework:getItem(player, item)
    local data = player.Functions.GetItemByName(item)
    data.count = data.amount
    return data
end

function framework:playerIsAdmin(source)
    return QBCore.Functions.HasPermission(source, 'god') or IsPlayerAceAllowed(source, 'command') or QBCore.Functions.HasPermission(source, 'admin')
end

function framework:getUserName(source)
    local player = self:getPlayerFromId(source)
    return player.PlayerData.charinfo.firstname, player.PlayerData.charinfo.lastname
end

function framework:getUserNameFromIdentifier(identifier)
    local result = MySQL.Sync.fetchAll('SELECT charinfo FROM `players` WHERE citizenid = ?', { identifier })
    if not result[1] then
        return '', ''
    end
    result = result[1]
    result = json.decode(result.charinfo)
    return result?.firstname, result?.lastname
end

function framework:getJobName(source)
    local player = self:getPlayerFromId(source)
    return player.PlayerData.job.name
end

return framework ---@type ServerFramework
