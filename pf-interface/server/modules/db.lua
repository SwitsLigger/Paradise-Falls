_G['db'] = {}
local Query <const> = {
    UPDATE_STRESS = 'UPDATE users SET stress = ? WHERE identifier = ?',
}

---@param source number | string
---@param value number
---@return boolean
function db.updateStress(source, value)
    local identifier = sfr:getIdentifier(source)
    local result = MySQL.update.await(Query.UPDATE_STRESS, { value, identifier })
    Debug('db:updateStress', source, value, result)
    Player(source).state:set('stressChanged', nil, true)
    return result > 0
end
