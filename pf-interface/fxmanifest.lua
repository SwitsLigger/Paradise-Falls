fx_version 'cerulean'

game 'gta5'

version '1.1.91'

lua54 'yes'

name 'qs-interface'
author 'Quasar Store'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/functions.lua',
    'shared/config.lua',
    'locales/*.lua'
}

client_scripts {
    'custom/client.lua',
    'client/custom/**',
    'client/modules/**',
    'client/main.lua'
}

ox_libs {
    'table'
}

files {
    'web/build/**',

    'locales/*.json',
    'custom/**',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'custom/server.lua',
    'server/modules/*.lua',
    'server/main.lua'
}

dependencies {
    'ox_lib'
}

ui_page 'web/build/index.html'
-- ui_page 'http://localhost:3005/' -- dev

escrow_ignore {
    'custom/**/*',
    'client/custom/**',
    'server/custom/**',
    'shared/**/*',
    'config/*',
    'locales/*.lua',
    'client/modules/seatbelt.lua'
}
