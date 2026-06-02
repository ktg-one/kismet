# PostToolUse recorder on the Skill tool. Pairs with require-skill.ps1.
# Install: move into .claude/hooks/ and register in .claude/settings.json
#   "PostToolUse": [ ...existing lint hook...,
#     { "matcher": "Skill", "hooks": [
#       { "type":"command", "command":"pwsh -NoProfile -File .claude/hooks/record-skill.ps1", "timeout":10 } ] } ]
# Appends the loaded skill name to a session-keyed marker so the gate knows
# what was loaded this session.
$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
try { $p = $raw | ConvertFrom-Json } catch { exit 0 }

$sid   = $p.session_id
$skill = $p.tool_input.skill
if ([string]::IsNullOrWhiteSpace($sid) -or [string]::IsNullOrWhiteSpace($skill)) { exit 0 }

$dir = Join-Path $PSScriptRoot '.skills'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Add-Content -Path (Join-Path $dir "$sid.txt") -Value $skill
exit 0
