local currentVersion = GetResourceMetadata(GetCurrentResourceName(), 'version', 0)
local resourceName = GetCurrentResourceName()

string.split = function(str, sep)
    local sep, fields = sep or ':', {}
    local pattern = string.format('([^%s]+)', sep)
    str:gsub(pattern, function(c) fields[#fields + 1] = c end)
    return fields
end

local function tonumberToVersion(number)
    local split = number:split('.')
    local version = ''
    for i = 1, #split do
        version = version .. split[i]
    end
    return tonumber(version)
end

local function checkVersionDifference(remoteVersion, descriptions)
    local _currentVersion = tonumberToVersion(currentVersion)
    local _remoteVersion = tonumberToVersion(remoteVersion)
    return _remoteVersion - _currentVersion, descriptions
end

if currentVersion then
    local githubURL = 'https://raw.githubusercontent.com/quasar-scripts/version/main/' .. resourceName .. '.json'
    PerformHttpRequest(githubURL, function(code, res, headers)
        if code == 404 then
            print('^1API is not available. Unable to check the version.^0')
            return
        end
        if code == 200 then
            local githubData = json.decode(res)
            local remoteVersion = githubData.version
            local descriptions = githubData.descriptions
            local difference, desc = checkVersionDifference(remoteVersion, descriptions)
            if difference == 0 then
                print('^2You are using the latest version of ' .. resourceName .. '!^0')
            elseif difference > 0 then
                print('^3New version available for ' .. resourceName .. '!^0')
                for _, d in pairs(desc) do
                    print('^3- ' .. d .. '^0')
                end
                print('^3You have version ' .. currentVersion .. ', upgrade to version ' .. remoteVersion .. '!^0')
            else
                print('^1You are using a newer version of ' .. resourceName .. ' than the one available on GitHub.^0')
            end
        end
    end, 'GET', '', {}, {})
else
    print('Unable to obtain the version of ' .. resourceName .. '. Make sure it is defined in your fxmanifest.lua.')
end
