
fx_version 'adamant'

game 'gta5'
lua54 'yes'

author 'c8re'
description 'chat chat chat'
version '1.0.0'

ui_page 'html/form.html'

files {
	'html/form.html',
	'html/css.css',
	'html/script.js',
	'html/jquery-3.4.1.min.js',
}

client_scripts{
    'config.lua',
    'client/main.lua',
}

server_scripts{
    'config.lua',
    'server/main.lua',
}


escrow_ignore {
	'client/main.lua',
	'server/main.lua',
	'config.lua'
  }




dependency '/assetpacks'