if Config.VoiceChat ~= 'saltychat' then return end

local isTalking = false

function IsTalking()
    return isTalking
end

local proximityDistance = 1.5

-- Proximity distance need to be (1.5, 3 or 6)
function GetProximityDistance()
    return proximityDistance
end

RegisterNetEvent('SaltyChat_VoiceRangeChanged', function(seviye)
    -- Set to mumble's proximity distance
    if seviye == 2.0 then
        proximityDistance = 1.5
    elseif seviye == 7.0 then
        proximityDistance = 3
    elseif seviye == 15.0 then
        proximityDistance = 6
    end
end)

AddEventHandler('SaltyChat_TalkStateChanged', function(talking)
    isTalking = talking
end)
