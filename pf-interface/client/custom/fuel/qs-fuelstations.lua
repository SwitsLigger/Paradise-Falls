if Config.Fuel ~= 'qs-fuelstations' then return end

function GetFuel(vehicle)
    return GetVehicleFuelLevel(vehicle)
end
