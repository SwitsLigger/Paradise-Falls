if Config.Fuel ~= 'standalone' then return end

function GetFuel(vehicle)
    return GetVehicleFuelLevel(vehicle)
end
