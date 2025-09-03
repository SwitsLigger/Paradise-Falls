if Config.VoiceChat ~= 'standalone' then return end

function IsTalking()
    return NetworkIsPlayerTalking(PlayerId())
end

-- Proximity distance need to be (1.5, 3 or 6)
function GetProximityDistance()
    return 1.5
end
