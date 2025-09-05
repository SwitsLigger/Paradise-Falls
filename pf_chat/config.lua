Config = {
    ------------------------------------------------------------
    -- WELCOME TO CORE CHAT
    -- A NEXT-GEN LOOKING CHAT SYSTEM (FREE EDITION)
    ------------------------------------------------------------

    --===========================================================
    -- General Settings
    --===========================================================

    ServerConsoleForAdmins = true, -- If true, displays server console prints (like resource starts/stops) 
                                   -- directly to in-game admins.
                                   -- Requires the 'chat.admin' ACE permission.

    ServerLogs = false,            -- If ServerConsoleForAdmins is also true, this will print general 
                                   -- server logs to admins in-game. Can be very spammy.

    --===========================================================
    -- Permission Groups
    --===========================================================
    -- This table defines the permission groups for chat banners.
    -- The order is important: players will get the banner for the FIRST group
    -- in this list that they have permission for (so put 'admin' before 'vip').
    --
    -- To assign a group, grant the player the corresponding ACE permission.
    -- Example: add_ace group.admin chat.admin allow
    --
    -- NOTE: The visual styles (colors, emojis) for these groups are
    -- configured in the html/script.js file, not here. This list
    -- just tells the server which permissions to check for.
    --===========================================================
    Groups = {
        'admin',
        'vip'
        -- You can add more groups here, e.g., 'moderator', 'donator'
    }
}
