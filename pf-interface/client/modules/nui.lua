local uiConfigured = 'init'
HudInitialized = false

RegisterNUICallback('update_minimap', function(map, cb)
    LoadMinimap(map or 'square')
    cb('ok')
end)

RegisterNUICallback('set_focus', function(state, cb)
    Debug('nui ::: set_focus', state)
    SetNuiFocus(state, state)
    cb('ok')
end)

local function languageToI18Next()
    local lang = Config.Locale
    local data = {}
    data[lang] = {}
    data[lang].translation = _T
    return lang, data
end

RegisterNUICallback('initialized', function(_, cb)
    while not _T do Wait(200) end
    if Initialized then
        Debug('Already initialized')
        return cb('ok')
    end
    local locale, resources = languageToI18Next()
    local config = Config
    SendReactMessage('onUiReady', {
        languageName = locale,
        resources = resources,
        config = {
            debug = config.Debug,
            version = GetResourceMetadata(GetCurrentResourceName(), 'version', 0),
            intl = Config.Intl,
            previewBackground = Config.PreviewScreenBackground,
            optional = Config.Optional,
            units = Config.Units
        }
    })
    Initialized = true
    HudInitialized = true
    TriggerServerEvent('interface:playerConnected')
    StartUI()
    cb('ok')
end)

exports('HasHudConfigured', function()
    while uiConfigured == 'init' do
        Debug('HasHudConfigured :: Waiting for UI to be configured')
        Wait(100)
    end
    return uiConfigured
end)

RegisterCommand('openui', function()
    ToggleHud(true)
end)

RegisterCommand('closeui', function()
    ToggleHud(false)
end)

RegisterNUICallback('toggle_is_configured', function(state, cb)
    Debug('toggle_is_configured', state)
    uiConfigured = state
    cb('ok')
end)
