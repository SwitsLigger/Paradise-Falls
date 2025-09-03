if not Config.Debug then
    return
end

Debug('Initialized reset_hud_config command')
RegisterCommand('reset_hud_config', function()
    SendReactMessage('clear_all_data')
end)

Debug('Initialized close_configure_hud command')
RegisterCommand('close_configure_hud', function()
    CloseConfigureHud()
end)

Debug('Initialized cinematic command')
RegisterCommand('cinematic', function()
    StartCinematicCam()
end, false)

Debug('Initialized stopcinematic commands')
RegisterCommand('stopcinematic', function()
    StopCinematicCam()
end, false)

RegisterCommand('notify', function(source, args, raw)
    Notification('Hello, this is a test notification, lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Test notification here!', 5000, 'fas fa-inbox')
end)

RegisterCommand('progresstest', function(source, args)
    Progress({
        label = 'testing',
        duration = 2000,
        disable = { move = true, sprint = true, car = true, combat = true, mouse = true },
        prop = {
            {
                model = 'prop_cs_pamphlet_01',
                bone = 60309,
                pos = vector3(0.0, 0.0, 0.0),
                rot = vector3(0.0, 0.0, 0.0)
            },
            {
                model = 'prop_sandwich_01',
                bone = 60309,
                pos = vector3(0.0, 0.0, 0.0),
                rot = vector3(0.0, 0.0, 0.0)
            }

        },
        anim = {
            dict = 'mini@repair',
            clip = 'fixing_a_ped',
            duration = 2000
        },
        -- sandwich

    })
    Debug('done')
end)
