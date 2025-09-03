---@class ServerFramework
---@field getPlayerFromId fun(self: ServerFramework, source: number): table
---@field getIdentifier fun(self: ServerFramework, source: number): string
---@field getAccountMoney fun(self: ServerFramework, source: number, account: MoneyType): number
---@field removeAccountMoney fun(self: ServerFramework, source: number, account: MoneyType, amount: number): boolean
---@field addAccountMoney fun(self: ServerFramework, source: number, account: MoneyType, amount: number)
---@field removeItem fun(self: ServerFramework, source: number, item: string, count: number)
---@field playerIsAdmin fun(self: ServerFramework, source: number): boolean
---@field getUserName fun(self: ServerFramework, source: number): string, string
---@field registerUsableItem fun(self: ServerFramework, item: string, cb: function)
---@field getSourceFromIdentifier fun(self: ServerFramework, identifier: string): number
---@field getItem fun(self: ServerFramework, player: table, item: string): {count: number}
---@field addItem fun(self: ServerFramework, source: number, item: string, count: number): boolean
---@field getUserNameFromIdentifier fun(self: ServerFramework, identifier: string): string
---@field getJobName fun(self: ServerFramework, source: number): string
---@field getStress fun(self: ServerFramework, source: number): number
---@field updateStress fun(self: ServerFramework, source: number, amount: number)

---@class ClientFramework
---@field getPlayerData fun(self: ClientFramework): table
---@field getIdentifier fun(self: ClientFramework): string
---@field getJobName fun(self: ClientFramework): string
---@field getJobGrade fun(self: ClientFramework): number
---@field getPlayers fun(self: ClientFramework): table
---@field getStatus fun(self: ClientFramework): {hunger: number, thirst: number, stress?: number}
---@field getJobLabel fun(self: ClientFramework): string


---@alias MoneyType 'money' | 'bank' | 'black_money'
