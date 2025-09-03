local playerId, serverId, ped = PlayerId(), GetPlayerServerId(PlayerId()), PlayerPedId()

GameScreenReady = false

local vehicle
local currentJob, currentMaxOnline, currentOnline = '', 0, 0

local speedMultiplier = Config.Units == 'mph' and 2.23694 or 3.6
local status = {
    hunger = 0,
    thirst = 0,
    stress = 0
}
CashAmount, BankAmount = 0, 0

local currentZone

---@param name string
---@param data any
function SendReactMessage(name, data)
    SendNUIMessage({
        action = name,
        data = data
    })
end

---@param data {map: 'circle' | 'square'}
RegisterNUICallback('game_screen_ready', function(data, cb)
    SetNuiFocus(false, false)
    GameScreenReady = true
    LoadMinimap(data.map or 'square')
    cb('ok')
end)

RegisterNUICallback('game_screen_preparing', function(data, cb)
    if GetResourceState('qs-multicharacter') == 'started' then
        TriggerEvent('multicharacter:skipIntro', true)
    end
    cb('ok')
end)

CreateThread(function()
    while not GameScreenReady do
        Wait(100)
    end
    while true do
        ped = PlayerPedId()
        local inVehicle = IsPedInAnyVehicle(ped, false)
        local zone = GetNameOfZone(GetEntityCoords(ped))
        if zone ~= currentZone then
            if MapType == 'circle' and (currentZone == 'ISHEIST' or zone == 'ISHEIST') then
                SetCircleMapCoords()
            end
            currentZone = zone
        end
        if Config.HideRadar then
            if not IsRadarHidden() and not inVehicle then
                DisplayRadar(false)
            elseif not IsRadarHidden() and inVehicle then
                DisplayRadar(true)
            end
        end
        if inVehicle and not vehicle then
            Debug('vehicle entered')
            DisplayRadar(true)
            vehicle = GetVehiclePedIsIn(ped, false)
            TriggerEvent('interface:vehicleEntered', vehicle)
            SendReactMessage('toggle_vehicle', {
                visible = true
            })
        elseif not inVehicle and vehicle then
            Debug('vehicle left')
            vehicle = nil
            TriggerEvent('interface:vehicleLeft')
            SendReactMessage('toggle_vehicle', {
                visible = false
            })
        end
        Wait(300)
    end
end)

local function updateHudValues()
    if not HudInitialized then
        Debug('Hud not initialized yet, skipping updateHudValues')
        return
    end
    local health = GetEntityHealth(ped) - 100
    local armour = GetPedArmour(ped)
    local stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
    local oxygen = GetPlayerUnderwaterTimeRemaining(playerId) * 10
    status = cfr:getStatus() or {}

    local talking = IsTalking()
    local proximityDistance = GetProximityDistance() or 0

    local minDistance = 1.5
    local maxDistance = 6.0
    local minPercentage = 25
    local maxPercentage = 100
    local distanceRange = maxDistance - minDistance
    local percentageRange = maxPercentage - minPercentage
    local voicePercentage = math.max(minPercentage, math.min(maxPercentage, minPercentage + ((proximityDistance - minDistance) / distanceRange) * percentageRange))

    SendReactMessage('update_hud_values', {
        health = health,
        armour = armour,
        hunger = status.hunger or 0,
        thirst = status.thirst or 0,
        stress = status.stress or 0,
        oxygen = oxygen,
        stamina = stamina,
        isTalking = talking,
        voice = voicePercentage
    })
end

---@param job? string
---@param maxOnline? number
---@param online? number
function UpdateDisplayValues(job, maxOnline, online)
    CreateThread(function() -- Avoid race condition with HudInitialized
        while not HudInitialized do
            Wait(100)
        end
        if job and currentJob ~= job then currentJob = job end
        if maxOnline and currentMaxOnline ~= maxOnline then currentMaxOnline = maxOnline end
        if online and currentOnline ~= online then currentOnline = online end
        SendReactMessage('update_displayer_data', {
            cash = CashAmount,
            bank = BankAmount,
            identifier = serverId,
            job = currentJob,
            maxOnline = currentMaxOnline,
            online = currentOnline
        })
        Debug('UpdateDisplayValues', CashAmount, BankAmount, serverId, currentJob, currentMaxOnline, currentOnline)
    end)
end

RegisterNetEvent('interface:updateDisplayValues', UpdateDisplayValues)

local function getStreetName(coords)
    local StreetHash1, StreetHash2 = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
    local Street1 = GetStreetNameFromHashKey(StreetHash1)
    local Street2 = GetStreetNameFromHashKey(StreetHash2)
    SendReactMessage('update_street_label', Street1 .. (Street2 ~= '' and ' ' .. ' | ' .. ' ' .. Street2 or ''))
end

local hudClosedByPauseMenu = false
CreateThread(function()
    while not GameScreenReady do
        Wait(100)
    end
    while true do
        SetRadarZoom(1150)
        if IsBigmapActive() then
            SetRadarBigmapEnabled(false, false)
        end
        updateHudValues()
        getStreetName(GetEntityCoords(ped))
        if IsPauseMenuActive() and not hudClosedByPauseMenu and HudActive then
            ToggleHud(false)
            hudClosedByPauseMenu = true
        elseif not IsPauseMenuActive() and hudClosedByPauseMenu and not HudActive then
            ToggleHud(true)
            hudClosedByPauseMenu = false
        end
        Wait(500)
    end
end)

local function updateCarHud()
    local fuel = GetFuel(vehicle)
    local speed = math.ceil(GetEntitySpeed(vehicle) * speedMultiplier)
    local rpm = GetVehicleCurrentRpm(vehicle) * 100
    local topSpeed = GetVehicleEstimatedMaxSpeed(vehicle) * speedMultiplier
    SendReactMessage('update_car_hud', {
        fuel = fuel,
        speed = speed,
        rpm = rpm,
        topSpeed = topSpeed
    })
end

CreateThread(function()
    while true do
        local sleep = 1250
        if vehicle and HudInitialized and DoesEntityExist(vehicle) then
            sleep = 75
            updateCarHud()
        end
        Wait(sleep)
    end
end)

if Config.ConfigurationMenu then
    RegisterCommand('/configure_hud', function()
        Debug('configure_hud')
        SetNuiFocus(true, true)
        SendReactMessage('toggle_editor_menu', {
            visible = true
        })
        if Config.EnableCinematicMode then
            StartCinematicCam()
        end
    end)
    RegisterKeyMapping('/configure_hud', 'Configure The Hud', 'keyboard', Config.MenuKeybind)
else
    Debug('ConfigurationMenu is disabled')
end

RegisterNUICallback('close_editor', function(data, cb)
    Debug('close_editor')
    CloseConfigureHud()
    SetNuiFocus(false, false)
    if cache.vehicle then
        SendReactMessage('toggle_vehicle', {
            visible = true
        })
    else
        SendReactMessage('toggle_vehicle', {
            visible = false
        })
    end
    cb('ok')
end)

function CloseConfigureHud()
    if Config.EnableCinematicMode then
        StopCinematicCam()
    end
end

function StartUI()
    SendReactMessage('initialize_ui', {
        visible = true
    })
end

exports('Initialize', StartUI)

HudActive = false

---@param state boolean
function ToggleHud(state)
    HudActive = state
    SendReactMessage('toggle_hud', HudActive)
end

exports('ToggleHud', ToggleHud)

CreateThread(function()
    if Config.HideRadar then
        DisplayRadar(false)
    end
end)

if Config.Stress then
    CreateThread(function()
        while not HudInitialized do
            Wait(100)
        end
        CreateThread(function() -- Speeding
            while true do
                local ped = PlayerPedId()
                if IsPedInAnyVehicle(ped, false) then
                    local speed = GetEntitySpeed(GetVehiclePedIsIn(ped, false)) * speedMultiplier
                    local stressSpeed = SeatbeltOn and Config.MinimumSpeed or Config.MinimumSpeedUnbuckled
                    if speed >= stressSpeed then
                        TriggerServerEvent('interface:updateStress', math.random(1, 3))
                    end
                end
                Wait(10000)
            end
        end)

        local function IsWhitelistedWeaponStress(weapon)
            if weapon then
                for _, v in pairs(Config.WhitelistedWeaponStress) do
                    if weapon == v then
                        return true
                    end
                end
            end
            return false
        end

        CreateThread(function() -- Shooting
            while true do
                local weapon = GetSelectedPedWeapon(ped)
                if weapon ~= `WEAPON_UNARMED` then
                    if IsPedShooting(ped) and not IsWhitelistedWeaponStress(weapon) then
                        if math.random() < Config.StressChance then
                            TriggerServerEvent('interface:updateStress', math.random(1, 3))
                        end
                    end
                else
                    Wait(1000)
                end
                Wait(8)
            end
        end)

        -- Stress Screen Effects

        function GetBlurIntensity(stresslevel)
            for _, v in pairs(Config.Intensity) do
                if stresslevel >= v.min and stresslevel <= v.max then
                    return v.intensity
                end
            end
            return 1500
        end

        function GetEffectInterval(stresslevel)
            for _, v in pairs(Config.EffectInterval) do
                if stresslevel >= v.min and stresslevel <= v.max then
                    return v.timeout
                end
            end
            return 60000
        end

        CreateThread(function()
            while true do
                local ped = PlayerPedId()
                local effectInterval = GetEffectInterval(status.stress)
                if status.stress >= 100 then
                    local BlurIntensity = GetBlurIntensity(status.stress)
                    local FallRepeat = math.random(2, 4)
                    local RagdollTimeout = FallRepeat * 1750
                    TriggerScreenblurFadeIn(1000.0)
                    Wait(BlurIntensity)
                    TriggerScreenblurFadeOut(1000.0)

                    if not IsPedRagdoll(ped) and IsPedOnFoot(ped) and not IsPedSwimming(ped) then
                        SetPedToRagdollWithFall(ped, RagdollTimeout, RagdollTimeout, 1, GetEntityForwardVector(ped), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
                    end

                    Wait(1000)
                    for _ = 1, FallRepeat, 1 do
                        Wait(750)
                        DoScreenFadeOut(200)
                        Wait(1000)
                        DoScreenFadeIn(200)
                        TriggerScreenblurFadeIn(1000.0)
                        Wait(BlurIntensity)
                        TriggerScreenblurFadeOut(1000.0)
                    end
                elseif status.stress >= Config.MinimumStress then
                    local BlurIntensity = GetBlurIntensity(status.stress)
                    TriggerScreenblurFadeIn(1000.0)
                    Wait(BlurIntensity)
                    TriggerScreenblurFadeOut(1000.0)
                end
                Wait(effectInterval)
            end
        end)
    end)
end

local x = -0.025
local y = -0.015
local function circleMap()
    RequestStreamedTextureDict('circlemap', false)
    while not HasStreamedTextureDictLoaded('circlemap') do
        Wait(100)
    end

    AddReplaceTexture('platform:/textures/graphics', 'radarmasksm', 'circlemap', 'radarmasksm')
    SetMinimapClipType(1)
    SetCircleMapCoords()
    SetRadarBigmapEnabled(true, false)
end

function SetCircleMapCoords()
    Debug('SetCircleMapCoords')
    local zone = GetNameOfZone(GetEntityCoords(PlayerPedId()))
    if zone == 'ISHEIST' then
        Debug('is hesit')
        SetMinimapComponentPosition('minimap', 'L', 'B', -0.022, -0.026, 0.16, 0.245)
        SetMinimapComponentPosition('minimap_mask', 'L', 'B', x + 0.06, y + 0.0189, 0.87, 0.215)
        SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.032, -0.04, 0.18, 0.22)
    else
        Debug('is not hesit')
        SetMinimapComponentPosition('minimap', 'L', 'B', -0.022, -0.026, 0.16, 0.245)
        SetMinimapComponentPosition('minimap_mask', 'L', 'B', x + 0.21, y + 0.09, 0.071, 0.164)
        SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.032, -0.04, 0.18, 0.22)
    end
    SetRadarBigmapEnabled(true, false)
end

local function squareMap()
    local defaultAspectRatio = 1920 / 1080 -- Don't change this.
    local resolutionX, resolutionY = GetActiveScreenResolution()
    local aspectRatio = resolutionX / resolutionY
    local minimapOffset = 0
    if aspectRatio > defaultAspectRatio then
        minimapOffset = ((defaultAspectRatio - aspectRatio) / 3.6) - 0.008
    end
    RequestStreamedTextureDict('squaremap', false)
    while not HasStreamedTextureDictLoaded('squaremap') do
        Wait(150)
    end

    SetMinimapClipType(0)
    AddReplaceTexture('platform:/textures/graphics', 'radarmasksm', 'squaremap', 'radarmasksm')
    AddReplaceTexture('platform:/textures/graphics', 'radarmask1g', 'squaremap', 'radarmasksm')
    -- 0.0 = nav symbol and icons left
    -- 0.1638 = nav symbol and icons stretched
    -- 0.216 = nav symbol and icons raised up
    SetMinimapComponentPosition('minimap', 'L', 'B', 0.0 + minimapOffset, -0.047, 0.1638, 0.183)

    -- icons within map
    SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.0 + minimapOffset, 0.0, 0.128, 0.20)

    -- -0.01 = map pulled left
    -- 0.025 = map raised up
    -- 0.262 = map stretched
    -- 0.315 = map shorten
    SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.01 + minimapOffset, 0.025, 0.262, 0.300)

    SetBlipAlpha(GetNorthRadarBlip(), 0)
    SetMinimapClipType(0)
    SetRadarBigmapEnabled(true, false)
end

MapType = 'circle'

---@param mapType 'circle' | 'square'
function LoadMinimap(mapType)
    MapType = mapType
    if mapType == 'circle' then
        circleMap()
        return
    end
    squareMap()
end

---@param sound 'category_down' | 'item_down' | 'finish' | 'cancel' | 'admin_active' | 'admin_disable'
RegisterNUICallback('play_sound', function(sound, cb)
    if Config.DisableSounds then
        return cb('ok')
    end
    if sound == 'category_down' then
        PlaySoundFrontend(-1, 'NAV_UP_DOWN', 'HUD_FRONTEND_DEFAULT_SOUNDSET', 0, 0, 1)
    elseif sound == 'item_down' then
        PlaySoundFrontend(-1, 'Object_Collect_Remote', 'GTAO_FM_Events_Soundset', 0, 0, 1)
    elseif sound == 'finish' then
        PlaySoundFrontend(-1, 'Menu_Accept', 'Phone_SoundSet_Default', 0, 0, 1)
    elseif sound == 'cancel' then
        PlaySoundFrontend(-1, 'MP_IDLE_KICK', 'HUD_FRONTEND_DEFAULT_SOUNDSET', 0, 0, 1)
    elseif sound == 'admin_active' then
        PlaySoundFrontend(-1, 'Hack_Success', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS', 0, 0, 1)
    elseif sound == 'admin_disable' then
        PlaySoundFrontend(-1, 'Hack_Failed', 'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS', 0, 0, 1)
    elseif sound == 'hover_down' then
        PlaySoundFrontend(-1, 'Highlight_Accept', 'DLC_HEIST_PLANNING_BOARD_SOUNDS', 0, 0, 1)
    elseif sound == 'hover_up' then
        PlaySoundFrontend(-1, 'Highlight_Error', 'DLC_HEIST_PLANNING_BOARD_SOUNDS', 0, 0, 1)
    else
        Error('Unknown sound:', sound)
    end
    cb('ok')
end)

exports('AddNotify', Notification)
