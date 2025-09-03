if Config.VoiceChat ~= 'pma' then return end

function IsTalking()
    return NetworkIsPlayerTalking(PlayerId())
end

-- Proximity distance need to be (1.5, 3 or 6)
function GetProximityDistance()
    local proximityDistance = 0
    if LocalPlayer.state['proximity'] then
        proximityDistance = LocalPlayer.state['proximity'].distance
    end
    return proximityDistance
end
