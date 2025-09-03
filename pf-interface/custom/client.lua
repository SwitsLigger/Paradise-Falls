local success, result = pcall(lib.load, ('custom.%s.client'):format(Config.Framework))

if not success then
    error(result, 0)
end

_G.cfr = result --[[@as ClientFramework]]

---@param text string
---@param header? string
---@param time? number
---@param icon? string
function Notification(text, header, time, icon)
    icon = icon or 'fas fa-inbox'
    header = header or 'Notification'
    text = text or 'Text PlaceHolder'
    time = time or 5000
    SendReactMessage('add_notification', {
        icon = icon,
        header = header,
        text = text,
        time = time
    })
end

RegisterNetEvent('interface:notification', Notification)

print('^2[INFO]^7 Successfully loaded the framework.', Config.Framework)

function DrawText3D(x, y, z, text, id, key, theme)
    if GetResourceState('qs-textui') == 'started' then
        return TriggerEvent('qs-textui:Draw3DText', x, y, z, id, key, text, theme)
    end

    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry('STRING')
    SetTextCentre(true)
    AddTextComponentString(text)
    SetDrawOrigin(x, y, z, 0)
    DrawText(0.0, 0.0)
    local factor = text:len() / 370
    DrawRect(0.0, 0.0 + 0.0125, 0.017 + factor, 0.03, 0, 0, 0, 75)
    ClearDrawOrigin()
end

function DrawGenericText(text)
    SetTextColour(186, 186, 186, 255)
    SetTextFont(4)
    SetTextScale(0.5, 0.5)
    SetTextWrap(0.0, 1.0)
    SetTextCentre(false)
    SetTextDropshadow(0, 0, 0, 0, 255)
    SetTextEdge(1, 0, 0, 0, 205)
    SetTextEntry('STRING')
    AddTextComponentString(text)
    DrawText(0.40, 0.00)
end

local _world3dToSreen2d, _getGameplayCamCoords, _getGameplayCamFov = World3dToScreen2d, GetGameplayCamCoords, GetGameplayCamFov
DrawText3DX = function(text, coords)
    local _coords        = vec3(coords.x, coords.y, coords.z)
    local onScreen, x, y = _world3dToSreen2d(_coords.x, _coords.y, _coords.z)
    local camCoords      = _getGameplayCamCoords()
    local dist           = #(camCoords - _coords)

    local size           = 2
    local scale          = (size / dist) * 2
    local fov            = (1 / _getGameplayCamFov()) * 100
    scale                = scale * fov

    if onScreen then
        SetTextScale(0.0 * scale, 0.55 * scale)
        SetTextFont(0)
        SetTextColour(255, 255, 255, 255)
        SetTextDropshadow(0, 0, 0, 0, 255)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry('STRING')
        SetTextCentre(1)

        AddTextComponentString(text)
        DrawText(x, y)
    end
end

-- function progress(name, label, duration, useWhileDead, canCancel, disableControls, animation, prop, propTwo, onFinish, onCancel)
--     if disableControls then
--         disableControls.move = disableControls.disableMovement
--         disableControls.car = disableControls.disableCarMovement
--         disableControls.mouse = disableControls.disableMouse
--         disableControls.combat = disableControls.disableCombat
--     end
--     if lib.progressCircle({
--             duration = duration,
--             label = label,
--             position = 'bottom',
--             useWhileDead = useWhileDead,
--             canCancel = canCancel,
--             disable = disableControls,
--             anim = {
--                 dict = animation?.animDict,
--                 clip = animation?.anim,
--                 flag = animation?.flags
--             },
--             prop = prop
--         })
--     then
--         return true
--     end
--     return false
-- end
