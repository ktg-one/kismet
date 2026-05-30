# PreToolUse STOP hook: enforce find-skills-first on frontend edits.
# Install: move this into .claude/hooks/ and register in .claude/settings.json
#   "PreToolUse": [ { "matcher": "Edit|Write|MultiEdit", "hooks": [
#     { "type":"command", "command":"pwsh -NoProfile -File .claude/hooks/require-skill.ps1", "timeout":15 } ] } ]
# Hard-blocks (permissionDecision: deny) an Edit/Write/MultiEdit to a frontend
# file when no frontend skill was loaded earlier this session. Uses only the
# documented hook-input fields (session_id, tool_input.file_path) plus the
# session marker written by record-skill.ps1. Fails OPEN on any error so it can
# never wedge the workflow; it only ever DENIES when it is certain.
$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
try { $p = $raw | ConvertFrom-Json } catch { exit 0 }

$fp  = $p.tool_input.file_path
$sid = $p.session_id
if ([string]::IsNullOrWhiteSpace($fp)) { exit 0 }

# Frontend domain only. Server/lib .ts, docs, config are out of scope (allow).
$ext = [System.IO.Path]::GetExtension($fp).ToLowerInvariant()
if (@('.tsx', '.jsx', '.css', '.scss') -notcontains $ext) { exit 0 }

$required = @(
  'impeccable', 'design-taste-frontend', 'design-taste-frontend-v1',
  'ui-ux-pro-max', 'gsap-scrolltrigger', 'gsap-framer-scroll-animation',
  'gsap', 'gsap-frameworks', 'awwwards-animations',
  'high-end-visual-design', 'redesign-existing-projects'
)

$skillsFile = Join-Path $PSScriptRoot ".skills/$sid.txt"
$loaded = @()
if (Test-Path $skillsFile) { $loaded = Get-Content $skillsFile }
foreach ($s in $loaded) {
  if ($required -contains $s.Trim()) { exit 0 }   # a frontend skill is loaded -> allow
}

$reason = "find-skills-first: editing a frontend file ($fp) but no frontend skill was loaded this session. Load one first (impeccable / design-taste-frontend / ui-ux-pro-max / awwwards-animations / gsap-*), then retry the edit."
$payload = @{
  hookSpecificOutput = @{
    hookEventName            = 'PreToolUse'
    permissionDecision       = 'deny'
    permissionDecisionReason = $reason
  }
}
Write-Output ($payload | ConvertTo-Json -Compress -Depth 5)
exit 0
