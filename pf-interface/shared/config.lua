Config = Config or {}

--[[
    The first thing will be to choose our main language, here you can choose
    between the default languages that you will find within locales/*,
    if yours is not there, feel free to create it!

    Languages available by default:
        "en"
        "es"
        or create your lang in locales/*
]]

Config.Locale = 'en'

--[[
    Framework Detection

    The system automatically detects if you are using qb-core or es_extended.
    If you rename these, you need to manually set your framework below.
]]

local frameworks = {
    ['es_extended'] = 'esx',
    ['qb-core'] = 'qb',
}

Config.Framework = DependencyCheck(frameworks) or 'standalone' -- Automatically detects framework

--[[
    General Configuration

    Define basic settings such as the server name, keybinds,
    and whether the interface starts automatically.
]]

-- Your currency symbol (https://www.telerik.com/blogs/javascript-intl-object)
Config.Intl = {
    locales = 'en-US',            -- 'en-US', 'pt-BR', 'es-ES', 'fr-FR', 'de-DE', 'ru-RU', 'zh-CN'
    options = {
        style = 'currency',       -- 'decimal', 'currency', 'percent', 'unit'
        currency = 'USD',         -- 'USD', 'EUR', 'BRL', 'RUB', 'CNY'
        minimumFractionDigits = 0 -- 0, 1, 2, 3, 4, 5
    }
}

Config.MenuKeybind = 'F9' -- Key to open the menu

--[[
    Interface Options

    Customize the user interface settings, including the configuration menu,
    stress bar, speed units, and whether to hide the radar.
]]

local voiceChatList = {
    ['pma-voice'] = 'pma',
    ['saltychat'] = 'saltychat'
}

Config.VoiceChat = DependencyCheck(voiceChatList) or 'standalone' -- Auto-detects voice chat system
Config.ConfigurationMenu = true                                   -- Welcome, preview, and configuration menu
Config.EnableCinematicMode = true
Config.Stress = true                                              -- Enables stress system
Config.StressChance = 0.0                                         -- Default: 10% -- Percentage Stress Chance When Shooting (0-1)
Config.MinimumStress = 50                                         -- Minimum Stress Level For Screen Shaking
Config.MinimumSpeed = 100                                         -- Going Over This Speed Will Cause Stress
Config.MinimumSpeedUnbuckled = 50                                 -- Going Over This Speed Will Cause Stress
Config.DisableJobsStress = { 'police', 'ambulance' }              -- Add here jobs you want to disable stress - OLD: -- DisablePoliceStress = true, -- If true will disable stress for people with the police job
Config.WhitelistedWeaponStress = {
    `weapon_petrolcan`,
    `weapon_hazardcan`,
    `weapon_fireextinguisher`
}
Config.Intensity = {
    [1] = {
        min = 50,
        max = 60,
        intensity = 1500,
    },
    [2] = {
        min = 60,
        max = 70,
        intensity = 2000,
    },
    [3] = {
        min = 70,
        max = 80,
        intensity = 2500,
    },
    [4] = {
        min = 80,
        max = 90,
        intensity = 2700,
    },
    [5] = {
        min = 90,
        max = 100,
        intensity = 3000,
    },
}
Config.EffectInterval = {
    [1] = {
        min = 50,
        max = 60,
        timeout = math.random(50000, 60000)
    },
    [2] = {
        min = 60,
        max = 70,
        timeout = math.random(40000, 50000)
    },
    [3] = {
        min = 70,
        max = 80,
        timeout = math.random(30000, 40000)
    },
    [4] = {
        min = 80,
        max = 90,
        timeout = math.random(20000, 30000)
    },
    [5] = {
        min = 90,
        max = 100,
        timeout = math.random(15000, 20000)
    }
}

Config.Optional = {
    display = {
        id = true,
        online = true,
        job = true,
        cash = true,
        bank = true
    }
}

Config.HarnessUses = 20
Config.Units = 'kmh'                                                           -- Vehicle speed units ('kmh' or 'mph')
Config.HideRadar = true                                                        -- Hide the minimap when the player is not inside a vehicle
Config.PreviewScreenBackground = 'https://i.ibb.co/392hB0xf/Screenshot-35.png' -- Background image for the preview screen

--[[
    Fuel System Dependencies

    Automatically detects compatible fuel systems. If using a custom fuel system,
    manual configuration may be needed.
]]

local fuels = {
    ['qs-fuelstations'] = 'qs-fuelstations',
    ['lc_fuel'] = 'lc_fuel'
}

Config.Fuel = DependencyCheck(fuels) or 'standalone' -- Auto-detects fuel system

--[[
    Multicharacter System

    Detects and integrates multicharacter support if applicable.
]]

local multicharacters = {
    ['qs-multicharacter'] = 'qs'
}

Config.Multicharacter = DependencyCheck(multicharacters) or 'standalone' -- Auto-detects multicharacter system

Config.Debug = true                                                      -- Enable debug mode
