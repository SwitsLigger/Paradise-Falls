local isCinematicActive = false
local camera = nil

function StartCinematicCam()
    if isCinematicActive then return end
    isCinematicActive = true

    Debug('Cinematic camera started.')

    local ped = PlayerPedId()
    local inVehicle = IsPedInAnyVehicle(ped, false)

    if inVehicle then
        TaskStartScenarioInPlace(ped, 'WORLD_HUMAN_DRIVER', 0, true)
    else
        TaskStartScenarioInPlace(ped, 'WORLD_HUMAN_STAND_MOBILE', 0, true)
    end

    local pedCoords = GetEntityCoords(ped)
    local radius = 3.0
    local angle = 0.0

    camera = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', pedCoords.x, pedCoords.y, pedCoords.z + 0.5, 0.0, 0.0, 0.0, 30.0, true, 2)
    SetCamActive(camera, true)
    RenderScriptCams(true, false, 0, true, true)

    CreateThread(function()
        while isCinematicActive do
            pedCoords = GetEntityCoords(ped)
            angle = angle + 0.05
            if angle >= 360.0 then angle = 0.0 end

            local offsetX = pedCoords.x + radius * math.cos(math.rad(angle))
            local offsetY = pedCoords.y + radius * math.sin(math.rad(angle))
            local offsetZ = pedCoords.z + 1.0

            SetCamCoord(camera, offsetX, offsetY, offsetZ)
            PointCamAtCoord(camera, pedCoords.x, pedCoords.y, pedCoords.z)
            Wait(0)
        end
    end)
end

function StopCinematicCam()
    if not isCinematicActive then return end
    isCinematicActive = false

    if camera then
        RenderScriptCams(false, false, 0, true, true)
        DestroyCam(camera, false)
        camera = nil
    end

    local ped = PlayerPedId()
    ClearPedTasks(ped)

    Debug('Cinematic camera stopped.')
end

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        StopCinematicCam()
    end
end)
