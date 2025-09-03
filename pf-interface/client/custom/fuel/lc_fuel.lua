if Config.Fuel ~= 'lc_fuel' then return end

Debug('lc_fuel ::: Loaded')

function GetFuel(vehicle)
    return exports['lc_fuel']:GetFuel(vehicle)
end
